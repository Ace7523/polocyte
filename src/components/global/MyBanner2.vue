<template>
   <div class="my-swiper">
       <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in banners">
            <img :src="banner">
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </div>
</template>
<script>
 export default {
    data () {
      return {
        banners: [
          '../../../public/indexPicture/01.jpg',
          '../../../public/indexPicture/02.JPG',
          '../../../public/indexPicture/03.JPG',
          '../../../public/indexPicture/04.JPG',
          '../../../public/indexPicture/05.jpg'
        ],
        swiperOption: {
          loop : true,
          speed:800,
          // autoHeight: true,
          effect : 'fade',
          slidesPerView: 3,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 20,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          scrollbar: {
            el: '.swiper-pagination',
          },
          autoplay: {
            autoplay: true,
            delay: 3000
          },
           navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
          // some swiper options...
        }
      }
    },
    mounted() {
      setTimeout(() => {
        // this.banners.push('/4.jpg')
        console.log('banners update')
      }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper, 
        'It will slideTo banners 3')
      // this.mySwiper.slideTo(3, 1000, false)
    }
  }
</script>
<style lang="scss" scoped>
  .my-swiper {
    // height: 300px;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .swiper-pagination {
      > .swiper-pagination-bullet {
        background-color: red;
      }
    }
  }
</style>
