const md5 = require('./md5.js')
const db = require('./db.js')
const formidable = require('formidable')
const fs = require('fs'),
  util = require('util')
const path = require('path')
const jwt = require('jsonwebtoken')

exports.posts = function(req, res, next) {
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish" }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      })
    }
    db.find('infos', { "query": { "state": "publish" } }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        })
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      return res.json(result2)
    })
  })
}

exports.admin = function(req, res, next) {
  let path = req.protocol + '://' + req.headers.host + '/public/avatars/'
  db.find('users', {}, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }

    delete result[0].pass
    result[0].avatar = path + result[0].avatar

    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.getArticle = function(req, res, next) {
  let articleID = Number(req.query.id) || false;
  let query = { "date": articleID };
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }

  db.find('infos', { "query": query }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.getNstest = function(req, res, next) {
 
  db.find('images', { "query": {} }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    console.log("!!!!!!!!!!!!!",result)
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.tags = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }

    let arr = [],
      arr2 = [];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].tag.length; j++) {
        arr.push(result[i].tag[j])
      }
    }

    arr.sort()
    for (let i = 0; i < arr.length;) {
      let count = 0;
      for (let j = i; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          count++;
        }
      }
      arr2.push({
        tag: arr[i],
        count: count
      })
      i += count;
    }

    arr2.reverse()
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": arr2
    })
  })
}

exports.tag = function(req, res, next) {
  let tag = [];
  if (req.query.tag) {
    tag.push(decodeURI(req.query.tag))
  }
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      })
    }

    db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } } }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        })
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      return res.json(result2)
    })
  })
}

exports.search = function(req, res, next) {
  let q;
  if (req.query.q) {
    q = req.query.q
  } else {
    q = ''
  }
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      })
    }

    db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } } }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        })
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      res.json(result2)
    })
  })
}

exports.archives = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }

    let arr = [],
      arr2 = [];

    for (let i = 0; i < result.length; i++) {
      let year = new Date(result[i].date).getFullYear() + ''
      let month = new Date(result[i].date).getMonth() + 1 + ''
      if (month.length === 1) {
        month = '0' + month;
      }
      // let date = `${year}年${month}月`;
      let date = `${year}${month}`;
      arr.push(date)
    }

    arr.sort()
    for (let i = 0; i < arr.length;) {
      let count = 0;
      for (let j = i; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          count++;
        }
      }
      arr2.push({
        date: arr[i],
        count: count
      })
      i += count;
    }

    arr2.reverse()
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": arr2
    })
  })
}

exports.archive = function(req, res, next) {
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };

  let year = req.query.date.slice(0, 4)
  let samllMonth = req.query.date.slice(4) - 1;
  let bigMonth = req.query.date.slice(4)
  let smallDate = new Date(+year, +samllMonth).getTime()
  let bigDate = new Date(+year, +bigMonth).getTime()
  db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } } }, function(err, result2) {
      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      return res.json(result2)
    })
  })
}

exports.articles = function(req, res, next) {
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": {}, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      })
    }

    db.find('infos', { "query": {} }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        })
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      return res.json(result2)
    })
  })
}

exports.article = function(req, res, next) {

  // 获取内容
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {

    let title = fields.title;
    let content = fields.content;
    let tag;
    let date = fields.date;
    // 默认标签
    if (fields.tag[0] === '') {
      tag = ['default']
    } else {
      tag = fields.tag;
    }
    let state = fields.state;
    let newData = {
      "title": title,
      "content": content,
      "tag": tag,
      "state": state,
      "date": date
    };
    console.log("newData",newData)
    db.find('infos', { "query": { "date": date } }, function(err, result) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 500,
          "message": "内部服务器错误"
        })
      }

      if (result.length === 1) {
        db.updateMany('infos', { "date": date }, newData, function(err, result2) {
          if (err) {
            console.log(err)
            return res.json({
              "code": 401,
              "message": "文章更新失败"
            })
          }

          return res.json({
            "code": 200,
            "message": "文章更新成功"
          })
        })
      } else {
        // 插入到数据库
        db.insertOne('infos', newData, function(err, result3) {
          if (err) {
            console.log(err)
            return res.json({
              "code": 401,
              "message": "文章发布失败"
            })
          }

          if (state === 'draft') {
            return res.json({
              "code": 200,
              "message": "草稿保存草稿"
            })
          }
          return res.json({
            "code": 200,
            "message": "文章发布成功"
          })
        })
      }
    })
  })
}

exports.uploadimagedesc = function(req, res, next) {
    // 获取内容
    let form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
  
      let title1 = fields.title1;
      let title2 = fields.title2;
      let title3 = fields.title3;
      let desc1 = fields.desc1;
      let desc2 = fields.desc2;
      let desc3 = fields.desc3;
      let date = fields.date;
      let state = fields.state;

      let newData = {
        "title1": title1,
        "title2": title2,
        "title3": title3,
        "desc1": desc1,
        "desc2": desc2,
        "desc3": desc3,
        "date": date
      };
      // 插入到数据库
      db.insertOne('imagedesc', newData, function(err, result) {
        if (err) {
          console.log(err)
          return res.json({
            "code": 401,
            "message": "文章发布失败"
          })
        }
        return res.json({
          "code": 200,
          "message": "文章发布成功"
        })
      })
      // db.find('infos', { "query": { "date": date } }, function(err, result) {
      //   if (err) {
      //     console.log(err)
      //     return res.json({
      //       "code": 500,
      //       "message": "内部服务器错误"
      //     })
      //   }
  
      //   if (result.length === 1) {
      //     db.updateMany('infos', { "date": date }, newData, function(err, result2) {
      //       if (err) {
      //         console.log(err)
      //         return res.json({
      //           "code": 401,
      //           "message": "文章更新失败"
      //         })
      //       }
  
      //       return res.json({
      //         "code": 200,
      //         "message": "文章更新成功"
      //       })
      //     })
      //   } else {
      //     // 插入到数据库
      //     db.insertOne('infos', newData, function(err, result3) {
      //       if (err) {
      //         console.log(err)
      //         return res.json({
      //           "code": 401,
      //           "message": "文章发布失败"
      //         })
      //       }
  
      //       if (state === 'draft') {
      //         return res.json({
      //           "code": 200,
      //           "message": "草稿保存草稿"
      //         })
      //       }
      //       return res.json({
      //         "code": 200,
      //         "message": "文章发布成功"
      //       })
      //     })
      //   }
      // })
    })
}

exports.uploadimagedesc2 = function(req, res, next) {
  // 获取内容
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {

    let title1 = fields.title1;
    let title2 = fields.title2;
   
    let desc1 = fields.desc1;
    let desc2 = fields.desc2;
   
    let date = fields.date;
   

    let newData = {
      "title1": title1,
      "title2": title2,
      
      "desc1": desc1,
      "desc2": desc2,
      
      "date": date
    };
    // 插入到数据库
    db.insertOne('imagedesc2', newData, function(err, result) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 401,
          "message": "文章发布失败"
        })
      }
      return res.json({
        "code": 200,
        "message": "文章发布成功"
      })
    })
    // db.find('infos', { "query": { "date": date } }, function(err, result) {
    //   if (err) {
    //     console.log(err)
    //     return res.json({
    //       "code": 500,
    //       "message": "内部服务器错误"
    //     })
    //   }

    //   if (result.length === 1) {
    //     db.updateMany('infos', { "date": date }, newData, function(err, result2) {
    //       if (err) {
    //         console.log(err)
    //         return res.json({
    //           "code": 401,
    //           "message": "文章更新失败"
    //         })
    //       }

    //       return res.json({
    //         "code": 200,
    //         "message": "文章更新成功"
    //       })
    //     })
    //   } else {
    //     // 插入到数据库
    //     db.insertOne('infos', newData, function(err, result3) {
    //       if (err) {
    //         console.log(err)
    //         return res.json({
    //           "code": 401,
    //           "message": "文章发布失败"
    //         })
    //       }

    //       if (state === 'draft') {
    //         return res.json({
    //           "code": 200,
    //           "message": "草稿保存草稿"
    //         })
    //       }
    //       return res.json({
    //         "code": 200,
    //         "message": "文章发布成功"
    //       })
    //     })
    //   }
    // })
  })
}

exports.getUploadimagedesc = function(req, res, next) {

  db.find('imagedesc', { "query": {} }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.getUploadimagedesc2 = function(req, res, next) {
  
    db.find('imagedesc2', { "query": {} }, function(err, result) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        })
      }
      
      return res.json({
        "code": 200,
        "message": "数据获取成功",
        "result": result
      })
    })
  }

exports.login = function(req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    let username = fields.user;
    let password = fields.pass;
    password = md5(password)

    // 根据用户名查询数据库
    db.find('users', {}, function(err, result) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 500,
          "message": "内部服务器错误"
        })
      }

      if (result.length === 0) {
        return res.json({
          "code": 401,
          "message": "找不到用户名"
        })
      }

      // console.log(result)
      let dbPassword = result[0].pass
      let id = result[0]._id
      let expires = 60 * 60 * 24 * 30
      if (dbPassword === password) {
        let token = jwt.sign({ id, username }, 'secret', { expiresIn: expires })
        res.cookie('token', token, { maxAge: expires })
        res.cookie('id', id, { maxAge: expires })
        res.cookie('username', username, { maxAge: expires })
        return res.json({
          "code": 200,
          "message": "登录成功"
        })
      } else {
        return res.json({
          "code": 401,
          "message": "密码错误"
        })
      }
    })
  })
}

exports.logout = function(req, res, next) {
  res.cookie('token', '', { maxAge: 0 })
  res.cookie('username', '', { maxAge: 0 })
  res.cookie('id', '', { maxAge: 0 })
  return res.json({
    "code": 200,
    "message": "退出成功"
  })
}

exports.updateAdminInfo = function(req, res, next) {
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    let newJson = fields.new;
    let oldJson = fields.old;
    db.updateMany('users', oldJson, newJson, function(err, result) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 401,
          "message": "信息修改失败"
        })
      }

      return res.json({
        "code": 200,
        "message": "信息修改成功"
      })
    })
  })
}

exports.avatar = function(req, res, next) {
  let username = req.cookies.username;

  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 500,
        "message": "内部服务器错误"
      })
    }

    // 限制头像大小 单位默认字节 这里限制大小为1m
    if (files.avatar.size / 1024 > 1024) {
      fs.unlink(files.avatar.path)
      return res.json({
        "code": 401,
        "message": "图片应小于1M"
      })
    }
    // 获取后缀名
    let extname = path.extname(files.avatar.name)
    let oldUrl = files.avatar.path;
    let newUrl = './public/avatars/avatar' + extname;
    let avatarName = 'avatar' + extname;

    // 头像上传到服务器
    let readStream = fs.createReadStream(oldUrl)
    let writeStream = fs.createWriteStream(newUrl)
    readStream.pipe(writeStream)
    readStream.on('end', function() {
      // 更新数据库中头像的链接信息
        db.updateMany('users', { "user": username }, { "avatar": avatarName },
          function(err, result) {
            if (err) {
              console.log(err)
              return res.json({
                "code": 401,
                "message": "头像更新失败"
              })
            }
            return res.json({
              "code": 200,
              "message": "头像上传成功"
            })
          })
      })
    })
}

exports.upload = function(req, res, next) {
  let username = req.cookies.username
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 401,
        "message": "表单解析错误"
      })
    }

    // 获取对象的最后一项
    let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]

    // 获取后缀名
    let extname = Date.now() + path.extname(lastItem.name)
    let oldUrl = lastItem.path
    let newUrl = './public/pictures/' + extname
    let imgUrl = req.protocol + '://' + req.headers.host + '/public/pictures/' + extname

    // 更改名字和路径,实现上传
    let readStream = fs.createReadStream(oldUrl)
    let writeStream = fs.createWriteStream(newUrl)
    readStream.pipe(writeStream)
    readStream.on('end', function() {
      return res.send(imgUrl)
    })
  })
}

exports.uploadimage = function(req, res, next) {
  let username = req.cookies.username
  let form = new formidable.IncomingForm()

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 401,
        "message": "表单解析错误"
      })
    }

    // 获取对象的最后一项
    let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]
    let indexTemp = req.query.index
    let extname = ''
    switch(indexTemp){
      case '1':
        extname = '01.jpg'
      break;
      case '2':
        extname = '02.jpg'
      break;
      case '3':
        extname = '03.jpg'
      break;
      case '4':
        extname = '04.jpg'
      break;
      case '5':
        extname = '05.jpg'
      break;
      case '6':
        extname = '06.jpg'
      break;
      case '7':
        extname = '07.jpg'
      break;
      default:
        extname = '00.jpg'
    }

    let oldUrl = lastItem.path
    let newUrl = './public/photoList/' + extname
    let imgUrl = req.protocol + '://' + req.headers.host + '/public/photoList/' + extname

    // 更改名字和路径,实现上传
    let readStream = fs.createReadStream(oldUrl)
    let writeStream = fs.createWriteStream(newUrl)
    readStream.pipe(writeStream)
    readStream.on('end', function() {
      return res.send(imgUrl);
    })
  }) 
}

exports.uploaditemimage = function(req, res, next) {
  let username = req.cookies.username
  let form = new formidable.IncomingForm()
  if(req.query && req.query && req.query.index == '1'){
    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 401,
          "message": "表单解析错误"
        })
      }
  
      // 获取对象的最后一项
      let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]
  
      // 获取后缀名
      // let extname = Date.now() + path.extname(lastItem.name)
      let time = new Date();
      let day = time.getDate();
      let extname = day+"_"+Date.now() + path.extname(lastItem.name)
      let oldUrl = lastItem.path
      let newUrl = './public/itemimages/' + extname
      let imgUrl = req.protocol + '://' + req.headers.host + '/public/itemimages/' + extname
  
      // let paramData = {
      //   imageTitle:"图片",
      //   imageDesc:"图片描述",
      //   imageUrl:imgUrl,
      //   imageClass:req.query.index
      // }
  
      // 更改名字和路径,实现上传
      let readStream = fs.createReadStream(oldUrl)
      let writeStream = fs.createWriteStream(newUrl)
      readStream.pipe(writeStream)
      readStream.on('end', function() {
        return res.send(imgUrl);
        // // 插入到数据库
        // db.insertOne('poloitems', paramData, function(err, result) {
        //   if (err) {
        //     console.log(err)
        //     return res.json({
        //       "code": 401,
        //       "message": "文章发布失败"
        //     })
        //   }
        //   console.log("图片上传成功")
        //   // return res.send(imgUrl);
        // })
        
      })
    }) 
  }  
  else{
    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 401,
          "message": "表单解析错误"
        })
      }
  
      // 获取对象的最后一项
      let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]
  
      // 获取后缀名
      // let extname = Date.now() + path.extname(lastItem.name)
      let time = new Date();
      let day = time.getDate();
      let extname = day+"_"+Date.now() + path.extname(lastItem.name)
      console.log(extname)
      let oldUrl = lastItem.path
      let newUrl = './public/uploadimage/' + extname
      let imgUrl = req.protocol + '://' + req.headers.host + '/public/uploadimage/' + extname
  
      let paramData = {
        imageTitle:"图片",
        imageDesc:"图片描述",
        imageUrl:imgUrl,
        imageClass:"图片类别1"
      }
  
      // 更改名字和路径,实现上传
      let readStream = fs.createReadStream(oldUrl)
      let writeStream = fs.createWriteStream(newUrl)
      readStream.pipe(writeStream)
      readStream.on('end', function() {
        // 插入到数据库
        db.insertOne('images', paramData, function(err, result) {
          if (err) {
            console.log(err)
            return res.json({
              "code": 401,
              "message": "文章发布失败"
            })
          }
          console.log("图片上传成功")
          return res.send(imgUrl);
        })
        
      })
    })
  }
}

exports.upPoloItem = function(req, res, next) {
  // 获取内容
  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {

    let itemNo = fields.itemNo;
    let itemName = fields.itemName;
    let brand = fields.brand;
    let series = fields.series;
    let material = fields.material;
    let standard = fields.standard;
    let status = fields.status;
    let functions = fields.functions;
    let styles = fields.styles;
    let color = fields.color;
    let productLoc = fields.productLoc;
    let shape = fields.shape;
    let klass = fields.klass;
    let specific = fields.specific;
    
    let feature1 = fields.feature1;
    let feature2 = fields.feature2;
    let feature3 = fields.feature3;
    let features = fields.features;
    let paint = fields.paint;
    let isCanPersonal = fields.isCanPersonal;
    let featuredesc = fields.featuredesc;
    let reserve1 = fields.reserve1;
    let reserve2 = fields.reserve2;
    let itemPrice = fields.itemPrice;
    let imageList = fields.imageList;
    let date = fields.date;

    let newData = {

      "itemNo": itemNo,//货号
      "itemName": itemName,//名称
      "brand": brand,//品牌
      "series": series,//系列
      "material": material,//材质
      "standard": standard,//规格
      "status": status,//适用空间

      "functions": functions,//功能
      "styles": styles,//风格
      "color": color,//颜色
      "productLoc": productLoc,//产地
      "shape": shape,//形状

      "klass": klass,//如 床 柜子 衣架
      "specific": specific,//如单人床  大衣柜 小衣柜 等具体分类

      "feature1": feature1,//甲醛释放量
      "feature2": feature2,//结构工艺
      "feature3": feature3,
      "features": features,
      "paint": paint,//油漆

      "isCanPersonal": isCanPersonal,//是否可定制
      "featuredesc": featuredesc,//产品描述
      "reserve1": reserve1,//预留字段1
      "reserve2": reserve2,//预留字段2
      "itemPrice": itemPrice,//价格
      "imageList": imageList,//图片列表 
      "date": date
    };
    // 插入到数据库
    db.insertOne('poloitems', newData, function(err, result) {
      if (err) {
        console.log(err)
        return res.json({
          "code": 401,
          "message": "ietm实例存入数据库失败"
        })
      }
      return res.json({
        "code": 200,
        "message": "ietm实例存入数据库成功"
      })
    })
  })
}

exports.getPoloItem = function(req, res, next) {
  
  db.find('poloitems', { "query": {} }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.getPoloItems = function(req, res, next) {
  let querydata = ''
  if(req.query && req.query.querydata){
    querydata = req.query.querydata
  }
  db.find('poloitems', { "query": {'status':querydata} }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    
    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.getPoloItemsByPost = function(req, res, next) {

  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {

    let querydata = fields.querydata
    let queryarr = fields.queryarr
    let rp = fields.rp
    console.log("rp",rp)
    console.log("queryarr",queryarr)
    //todo 测试分页 
    // db.find('poloitems', { "query": queryarr ,"limit": 2,"page": 2,}, function(err, result) {
    db.find('poloitems', { "query": queryarr }, function(err, result) {  
      if (err) {
        console.log(err)
        return res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        })
      }
      console.log(result)
      return res.json({
        "code": 200,
        "message": "数据获取成功",
        "result": result
      })
    })
  })
  
}

exports.getAllStates = function(req, res, next) {
  db.find('poloitems', { "query": {} }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      })
    }
    
    let arr1 = []
    let arr2 = []
    let arr3 = []
    let arr4 = [] 
    let arr5 = [] 
    let arr6 = [] 
    let arrRestlt = {}
    if(result.length > 0){
      for(let i = 0 ; i< result.length ; i++){
        arr1.push(result[i].status)
        arr3.push(result[i].klass)
        arr5.push(result[i].series)
      }
    }
    arr1.sort();
    for (let i = 0; i < arr1.length;) {
      let count = 0;
      for (let j = i; j < arr1.length; j++) {
        if (arr1[i] === arr1[j]) {
          count++;
        }
      }
      arr2.push({
        tag: arr1[i],
        count: count
      })
      i += count;
    }

    arr3.sort()
    for (let i = 0; i < arr3.length;) {
      let count = 0;
      for (let j = i; j < arr3.length; j++) {
        if (arr3[i] === arr3[j]) {
          count++;
        }
      }
      arr4.push({
        tag: arr3[i],
        count: count
      })
      i += count;
    }

    arr5.sort()
    for (let i = 0; i < arr5.length;) {
      let count = 0;
      for (let j = i; j < arr5.length; j++) {
        if (arr5[i] === arr5[j]) {
          count++;
        }
      }
      arr6.push({
        tag: arr5[i],
        count: count
      })
      i += count;
    }


    arr2.reverse()
    arr4.reverse()
    arr6.reverse()
    
    arrRestlt.statuses = arr2;
    arrRestlt.klasses = arr4;
    arrRestlt.series = arr6;

    return res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": arrRestlt
    })
  })
}

exports.updateAdminPassword = function(req, res, next) {
  let username = req.cookies.username;

  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    let oldPass = md5(fields.oldPass)
    let newPass = md5(fields.pass)
    db.find('users', {}, function(err, result) {
      if (oldPass !== result[0].pass) {
        return res.json({
          "code": 403,
          "message": "密码输入有误"
        })
      }

      db.updateMany('users', { "user": username }, { "pass": newPass }, function(err, result2) {
        if (err) {
          console.log(err)
          return res.json({
            "code": 401,
            "message": "密码修改失败"
          })
        }
        res.cookie('token', '', { maxAge: 0 })
        res.cookie('username', '', { maxAge: 0 })
        res.cookie('id', '', { maxAge: 0 })
        return res.json({
          "code": 200,
          "message": "密码修改成功"
        })
      })
    })
  })
}

exports.deleteArticle = function(req, res, next) {
  let id = Number(req.query.id) || ''
  db.deleteMany('infos', { date: id }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        "code": 401,
        "message": "文章删除失败"
      })
    }

    return res.json({
      "code": 200,
      "message": "文章删除成功"
    })
  })
}