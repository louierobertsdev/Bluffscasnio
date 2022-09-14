import React from 'react'
import Sapou from '../partials/sapou'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Child(props){
	return(
		<div className="donation_header"><h4>{props.title}</h4></div>
    )
}
function Page(props){
    let lang = props.lang 
    let info = props.info
    let info_title = ["crypto", "paypal"]
	return (
        <>
            <Sapou lang={lang} page="donations"></Sapou>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <div className="donation_container color_yellow">
                        {	                    																		
                            info_title.map(function(item01, i){                        
                                let first = item01.slice(0, 1).toUpperCase()
                                let rest = item01.slice(1, item01.length)
                                let title = first + rest
                                let style = "donation_body donation_body_crypto shadow_concav"
                                if(item01 !== "crypto"){
                                    style = "donation_body"
                                }
                                return(
                                    <div key={i} className="donation_box">
                                        { item01 !== "crypto" ? null : <Child title={title}></Child> }
                                        <ul className={style}>
                                            {
                                                info.map(function(item02, j){
                                                    if(item01 === item02.type){
                                                        if(item01 === "crypto"){
                                                            return (
                                                                <li key={j} className="donation_link donation_link_crypto">
                                                                    <p key={i}><span>{item02.title}: </span><b>{item02.text}</b></p>
                                                                </li>
                                                            );                                                            
                                                        } else if(item01 === "paypal"){
                                                            return (                                                                
                                                                <li key={j} className="donation_link donation_link_paypall">
                                                                    <a className="paypal_button" rel="noopener noreferrer" target="_blank" href="https://paypal.me/oanapopescu93?country.x=RO&locale.x=en_US">Paypal</a>
                                                                </li>
                                                            )
                                                        } else {
                                                            return null
                                                        }
                                                    } else {
                                                        return null
                                                    }                                                                                                                  
                                                }) 
                                            } 
                                        </ul>
                                    </div>
                                )                                                                                                                
                            })
                        }
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Row>            
            <Button className="button_table shadow_convex" type="button" onClick={()=>props.back()}>
                {lang === "ro" ? <span>Inapoi</span> : <span>Back</span>}
            </Button>
        </>
    )
}
export default Page