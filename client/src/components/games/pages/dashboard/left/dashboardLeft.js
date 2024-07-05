import React from 'react'
import { useDispatch } from 'react-redux'
import { decryptData } from '../../../../../utils/crypto'
import { translate } from '../../../../../translations/translate'
import profilePic from '../../../../../img/profile/predators.jpg'
import { changePopup } from '../../../../../reducers/popup'
import { changePage, changeGame, changeGamePage } from '../../../../../reducers/page'
import { Row, Col, Button } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faUpload} from '@fortawesome/free-solid-svg-icons'
import carrot_img from '../../../../../img/icons/carrot_icon.png'

function Picture(props){
	let picId = props.pic_id

	function choosePic(){
		if(typeof props.choice === "function"){
            props.choice('change_pic')
        }
	}	

	return <div className="profile_pic_container shadow_convex" onClick={()=>choosePic()}>
        <div className="profile_pic_default">
            <FontAwesomeIcon icon={faUpload} />
        </div>
        {(() => {
            if(picId) {
                return <div className="profile_pic">
                    <div className="crop_profile_pic">
                        <img alt="profile_pic" className={"profile_pic pic_"+picId} src={profilePic}/>
                    </div>
                </div>
            } else {
                return <div className="profile_pic">
                    <FontAwesomeIcon icon={faUser}/>
                </div>
            }	
        })()}        
    </div>
}

function DashboardLeft(props){ 
    const {home, user, lang, currency} = props
    let dispatch = useDispatch()

    let name = user.user ? decryptData(user.user) : "-"
    let money = user.money ? decryptData(user.money) : 0
    let profiles = home.profiles
    let picId = user.profile_pic ? decryptData(user.profile_pic) : 1
    let animal = profiles.filter((x)=>{
        return x.id === parseInt(picId)
    })

    function handleChoice(choice){
        if(choice === "buy_carrots"){
            dispatch(changePage('BuyCarrots'))
            dispatch(changeGame(null))
            dispatch(changeGamePage(null))
        } else {
            let title = ""
            let data = null
            let size = 'sm'
            switch(choice) {
                case "change_pic":
                    title = "choose_profile_pic"
                    data = profiles
                    size = 'sm'
                    break
                case "change_username":
                case "change_password":
                    title = choice
                    break
                default:              
            }
            
            let payload = {
                open: true,
                template: choice,
                title,
                size,
            }
            if(data){
                payload.data = data
            }
            dispatch(changePopup(payload))
        }
	}

    return <div id="dashboard_left" className="dashboard_box shadow_concav">
        <Row>
            <Col sm={12} md={4} lg={12} className="dashboard_user_pic">
                <Picture profiles={profiles} pic_id={picId} choice={(e)=>handleChoice(e)} />
                <div className="profile_pic_name shadow_convex">
                    <span>{name}</span>
                </div>
            </Col>
            <Col sm={12} md={8} lg={12} className="dashboard_user_info">
                <Row>
                    <Col sm={12}>
                        <div className="dashboard_user_info_left">                            
                            <p>
                                <b>{translate({lang: lang, info: "animal"})}: </b>
                                {animal && animal[0] ? <span>{animal[0]["name_" + props.lang.toLowerCase()] || animal[0].name_eng.toLowerCase()}</span> : <span>-</span>}
                            </p>
                            <p><b>{translate({lang: lang, info: "carrots"})}: </b>{money} <img alt="carrot_img" className="currency_img" src={carrot_img}/></p>                            
                        </div>
                        <div className="dashboard_user_info_right">                            
                            <p><b>{translate({lang: lang, info: "currency"})}: </b><span>{currency}</span></p>
                            <p><b>{translate({lang: lang, info: "language"})}: </b><span>{lang}</span></p>
                        </div>                                               
                    </Col>
                    <Col sm={12}>
                        <Row>
                            <Col sm={12} className="dashboard_left_buttons">
                                <Button type="button" onClick={()=>handleChoice("change_username")} className="mybutton button_fullcolor shadow_convex">
                                    {translate({lang: lang, info: "change_username"})}
                                </Button>	
                                <Button type="button" onClick={()=>handleChoice("change_password")} className="mybutton button_fullcolor shadow_convex">
                                    {translate({lang: lang, info: "change_password"})}
                                </Button>	
                                <Button type="button" onClick={()=>handleChoice("buy_carrots")} className="mybutton button_fullcolor shadow_convex">
                                    {translate({lang: lang, info: "buy_carrots"})}
                                </Button>	
                            </Col>
                        </Row>
                    </Col>
                </Row>                
            </Col>
        </Row>
    </div>
}
export default DashboardLeft