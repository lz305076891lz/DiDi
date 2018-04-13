import React from 'react'
import {connect} from 'react-redux'

import {List, InputItem, NavBar} from 'antd-mobile'


import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'


@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:[{_id:1,content:'jkl'},{_id:2,content:'asd'},{_id:3,content:'zxc'}]
    }
  }

  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({
      text:''
    })
  }

  render(){

    const {chatmsg} = this.props.chat
    const {user} = this.props.match.params

    const Item = List.Item

    return(
      <div id = 'chat-page'>

        <NavBar mode ='dark'>
          {this.props.match.params.user}
        </NavBar>

        {chatmsg?(chatmsg.map( v=>{
            return v.from==user?(
              <List key={Math.random()}>
                <Item 
                  thumb={''}
                  >{v.content}</Item>
              </List>
            ):(
              <List key={Math.random()}>
                <Item 
                  extra={'avatar'}
                  className='chat-me'>{v.content}</Item>
              </List>
            ) 
        })):"Loading"

        }

        <div className='stick-footer'>
          <List>
            <InputItem
            placeholder='please input'
            value = {this.state.text}
            onChange={v=>{
              this.setState({'text':v})
            }}
            extra={<span onClick={()=>this.handleSubmit()}>enter</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
