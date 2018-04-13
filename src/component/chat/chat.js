import React from 'react'
import {connect} from 'react-redux'

import {List, InputItem} from 'antd-mobile'

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

  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }

  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    console.log({from,to,msg})
    this.props.sendMsg({from,to,msg})
    this.setState({
      text:''
    })
  }

  render(){
    const {chatmsg} = this.props.chat
    return(
      <div>
        { chatmsg?chatmsg.map( v=>{ return(<p key={v._id}>{v.content}</p>)}):"chatmsg is not loaded yet" }
        <div className='stick-footer'>
          <List>
            <InputItem
            placeholder='please input'
            value = {this.state.text}
            onChange={v=>{
              this.setState({'text':v})
            }}
            extra={<span onClick={()=>this.handleSubmit()}>enter</span>}
            >infomation</InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
