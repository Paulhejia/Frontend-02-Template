import { Component, createElement } from "../../framework";

class Swiper  extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }

    setAttribute(name, value) {
        this.attributes[name] = value
    }

    render() {
        console.log(this.attributes)
        const wrapper = document.createElement('div');
        const container = document.createElement('div');
        wrapper.appendChild(container);
        this.root = wrapper;   
        container.className = 'swiper-container';
        if (this.attributes.className) {
            wrapper.className = this.attributes.className;
        }
        for (let source of this.attributes.imgArrs) {
            let img = document.createElement('div')
            img.style.backgroundImage = `url(${source})`
            img.classList.add('swiper-item')
            container.appendChild(img)
        }
        const singleWidth = 500;
        // 无缝滚动加长 block
        const extraBlockLength = 3;
        let range = document.createRange();
        range.setStart(container, 0);
        range.setEnd(container, extraBlockLength);
  
        container.appendChild(range.cloneContents());
        // 起始点是 5
        let position = this.attributes.imgArrs.length;
        let currentPos = -singleWidth * position;
        container.style.transform = `translateX(${ currentPos }px)`;        
        container.addEventListener('mousedown', (e) => {
            let startX = e.clientX;
            container.transition = 'none';  
            const mouseMove = (e) => {
                let x = e.clientX - startX;                
                container.style.transform = `translateX(${ currentPos + x }px)`;                    
            }

            const recovery = (e) => {                
                console.log(e);
                if( position === 0) {                    
                    position = 5;
                    currentPos = -singleWidth * position;
                    container.style.transition = 'none'; 
                    container.transform = `translateX(${ currentPos }px)` 
                    
                }
                if(position === this.attributes.imgArrs.length + extraBlockLength - 1) {                                            
                    position = 2;
                    currentPos = -singleWidth * position;
                    container.style.transition = 'none'; 
                    container.transform = `translateX(${ currentPos }px)`; 
                    
                }
                container.addEventListener('transitionend', recovery, false);
                container.addEventListener('webkitTransitionEnd', recovery, false);                
            }

            const mouseUp = (e) => {
                let x = e.clientX - startX;                
                position = position - Math.round(x / singleWidth);
                console.log(position);
                container.style.transition = 'ease 0.5s'; 
                currentPos = -singleWidth * position;
                console.log(currentPos);
                // 这里改成 
                if( position === 0 || position === this.attributes.imgArrs.length + extraBlockLength - 1) {                     
                    container.addEventListener('transitionend', recovery, false);
                    container.addEventListener('webkitTransitionEnd', recovery, false);                    
                }   
                //setTimeout(() => {
                    container.style.transform = `translateX(${ currentPos }px)` 
                //}, 0)        
                document.removeEventListener('mousemove', mouseMove)
                document.removeEventListener('mouseup', mouseUp)
            }          
            
            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)
        })

        
        let currentIdx = 0;
        // user active call


        // auto loop
        /* 
        setInterval(() => {
            ++ currentIdx;
            container.style.transform = `translateX(-${currentIdx * singleWidth}px)`;
        }, 3000);
        */

        return this.root
    }

    mountTo(parent) {
        parent.appendChild(this.render())
    }
}


let imgArrs = [
    "https://imgcdn.chuxingyouhui.com/pintuan/mng/20200602/ac84c18a19c34b47b017d10dc5f7fdec.jpeg?x-oss-process=image/resize,w_400/quality,Q_85",
    "https://imgcdn.chuxingyouhui.com/pintuan/mng/20191120/c111d79ebea74b7a88cfda55c7d7b483.jpeg?x-oss-process=image/resize,w_400/quality,Q_85",
    "https://imgcdn.chuxingyouhui.com/pintuan/mng/20200812/d4605d090abd4296818cb6af2ce2e0ce.jpeg?x-oss-process=image/resize,w_400/quality,Q_85",
    "https://a.vpimg2.com/upload/merchandise/pdcvis/102570/2020/0213/151/e8082608-5b96-4121-951d-5ed3dcd62e96_420_531.jpg",
    "https://yd-imgs.380star.com/upload/uploadfile/2019/5/15/15579005703116479198403032330.jpg?x-image-process=image/resize,m_pad,h_400,w_400",
]

const app = <Swiper imgArrs={imgArrs} className="swiper-wrapper"></Swiper>

app.mountTo(document.body)