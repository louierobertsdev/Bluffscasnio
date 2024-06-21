import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { translate } from '../../translations/translate'
import { decryptData } from '../../utils/crypto'
import { changePic } from '../../reducers/auth'
import Carousel from '../carousel/carousel'

function ChangeProfilePic(props) {
    const {lang} = props
    let home = useSelector(state => state.home)
    let user = useSelector(state => state.auth.user)
    let profiles = home.profiles
    let picId = user.profile_pic ? decryptData(user.profile_pic) : 0
    let indexProfile = profiles.findIndex((x) => x.id === parseInt(picId))
    let money = user.money ? decryptData(user.money) : 0 
    let account_type = user.account_type ? decryptData(user.account_type) : 1
    const [choice, setChoice] = useState(null)
    const [error, setError] = useState(false)
    const [index, setIndex] = useState(indexProfile)
    let dispatch = useDispatch() 
    
    let profile_carousel_options = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        dots: false,
        arrows: true,
        initialSlide: 0,
        swipeThreshold: 20,
    }

    function handlePic(item, i){
        setError(false)
        if(!item.free && money < 1000 && account_type === 1){
            setError(true)
            setTimeout(function(){ 
                setError(false)
            }, 3000)
        } else {
            setIndex(i)
            setChoice(item.id)
        }
        // } else if(parseInt(i) !== parseInt(picId)){  
        //     console.log('handlePic2 ', i, item)          
        //     setIndex(i)
        //     setChoice(item.id)      
        // }
    }

    function choosePic(e){
        if(typeof props.choosePic === "function"){
            dispatch(changePic(e.value))
            props.choosePic(e)
        }
    }

    return <div className="changeProfilePic">
        <div className="changeProfilePic_box">
            {profiles && profiles.length>0 ? <>
                <Carousel 
                    id="carousel_profile"
                    template="profile" 
                    options={profile_carousel_options} 
                    lang={lang} 
                    itemList={profiles} 
                    handlePic={(item, i)=>handlePic(item, i)}
                    money={money}
                    account_type={account_type}
                    selected={index}
                />
            </> : <>
                {translate({lang: lang, info: "error"})}
            </>}
            {error ? <div className="alert alert-danger"><p className="text_red">{translate({lang: lang, info: "profile_grey"})}</p></div> : null}
        </div>
        <div className="changeProfilePic_buttons">
            <Button type="button" id="changeProfilePic_btn" className="mybutton button_fullcolor_dark" onClick={()=>choosePic({value: choice, uuid: user.uuid, type: "pic"})}>
                {translate({lang: lang, info: "choose"})}
            </Button>
        </div>
    </div>
}

export default ChangeProfilePic