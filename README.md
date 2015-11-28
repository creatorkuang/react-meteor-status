Meteor status (React package)
=============

##Installation
```bash
$ meteor add creatorkuang:react-meteor-status
```

##Usage
Just insert `<ConnectStatus />` 

## Component Props
### style
root box style
### btnStyle
retry button style
### textStyle
text info style
### lang
It's a object,default it's chinese, your could change your language with different object. Example:
```javascript
let lang={
		waiting:'Waiting for server, system will reconnect in ',
	  waitingAfter:' second.',
	  connecting:'Connecting...',
	  offline:'Offline! Please check your network.',
	  retryNow:'Reconnect Now!'
}
```
Then in React Componet
```javascript
	<ConnectStatus lang={lang} />
```

## Contributors
- [Creatorkuang](https://github.com/creatorkuang)

## MIT

