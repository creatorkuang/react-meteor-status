ConnectStatus=React.createClass({
	propTypes: {
	    style:React.PropTypes.object,
	    btnStyle:React.PropTypes.object,
	    textStyle:React.PropTypes.object,
	    lang:React.PropTypes.object,
	},
	getInitialState() {
	    return {
	        isConnected:true,
	        isOffline:false,
	        isConnecting:false,
	        retryTime:0
	    };
	},
	getDefaultProps() {
	    return {
	        lang:{
	        	waiting:'等待与服务器连接，系统自动在 ',
	        	waitingAfter:' 秒后重新连接。',
	        	connecting:'正在连接中...',
	        	offline:'离线状态，请检查您的网络设置：）',
	        	retryNow:'立即重连！'
	        }  
	    };
	},
	componentDidMount() {
			let self=this
			let retryHandle = null
			let clearRetryInterval = function () {
			  clearInterval(retryHandle)
			  retryHandle = null
			}
			var trackStatus=function(){
				 if(Meteor.status().status==='waiting'){
		    	retryHandle = retryHandle || setInterval(function () {
				    let timeDiff   = Meteor.status().retryTime - (new Date).getTime()
				    let _retryTime = timeDiff > 0 && Math.round(timeDiff / 1000) || 0
				     self.setState({
				     	retryTime:_retryTime
				     });
			     }, 500)
		    	self.setState({
		    		isConnected:false,
		    		isConnecting:false
		    	})
		    }else{
		    	clearRetryInterval()
		    }

		    if(Meteor.status().status==='offline'){
		    	self.setState({
		    		isOffline:true,
		    		isConnected:false,
		    		isConnecting:false
		    	})
		    }

		    if(Meteor.status().status==='connecting'){
		    	self.setState({
		    		isConnecting:true
		    	})
		    }

		    if(Meteor.status().connected){
		    	self.setState({
		    		isConnected:true,
		    		isOffline:false,
		    		isConnecting:false
		    	})
		    }	
			}
	   	Meteor.autorun(trackStatus);
	},
	getStyles(){
		return {
			root:{
				padding:'5px 10px',
				background:'#eeeeee',
				textAlign:'center',
			},
			btn:{
				float:'right',
				background:'#FF9c10',
				padding:'5px 10px',
				fontSize:'10px',
				color:'white',
				cursor:'pointer'
			},
			text:{
				fontSize:'12px'
			}
		}
	},
	render(){
		let pageNode=<div></div>
		let lang=this.props.lang;
		let style=this.getStyles();
		if(!this.state.isConnected||this.state.isConnecting){
			let reconnect=<span style={_.extend({},style.btn,this.props.btnStyle)} onClick={this._reconnect}>{lang.retryNow}</span>
			let text=lang.waiting+this.state.retryTime+lang.waitingAfter
			if(this.state.isOffline){
				text=this.props.lang.offline
			}
			if(this.state.isConnecting){
				text=this.props.lang.connecting
			}
			pageNode=(
				<div style={_.extend({},style.root,this.props.style)}>
					{reconnect} <span style={_.extend({},style.text,this.props.textStyle)}>{text}</span>
					<div style={{clear:'both'}}></div>
				</div>
			)
		}
		return pageNode
	},
	_reconnect(){
		Meteor.reconnect()
	}
})