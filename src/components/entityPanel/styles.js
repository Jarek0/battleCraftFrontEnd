import {StyleSheet} from 'aphrodite';

const styles = {
  background:{
    zIndex:'2',
    position:'fixed',
    height:'100%',
    width:'100%',
    top:'0',
    left:'0',
    backgroundColor:'rgba(5, 5, 5, 0.55)'
  },
  popupContent:{
    fontFamily:'arial, helvetica, sans-serif',
    boxSizing:'border-box',
    position:'fixed',
    width:'60%',
    margin:'20%',
    marginTop:'8%',
    zIndex:'100',
    borderRadius:'3px',
    background:'#45341d',
    padding:'10px',
    paddingBottom:'15px',
    paddingTop:'15px',
    },
  panelContainer:{
    boxSizing:'border-box',
    display:'block',
    position:'fixed',
    width:'60%',
    top:'5%',
    left:'20%',
    zIndex:'100',
    padding:'1%',
    background:'#45341d',
  },
  optionContainer:{
    width:'48%',
    float:'left',
    marginLeft:'1%',
    marginRight:'1%',
    borderRadius:'2px',
    marginBottom:'5px',
    marginTop:'5px',
  },
  optionLabel:{
    boxSizing:'border-box',
    fontWeight:'700',
    textShadow:'rgba(0, 0, 0, 0.3) -2px -2px 0px',
    paddingTop:'5px',
    paddingBottom:'5px',
    display:'inline-block',
    width:'100%',
    textAlign:'center',
    borderRadius:'2px 2px 0 0',
    backgroundImage: 'linear-gradient(#a48c6d, #65462a, #463716)',
    color:'rgb(223, 214, 197)',
    border:'1px black solid',
    borderTopRightRadius:'5px',
    borderTopLeftRadius:'5px',
  },
  optionInput:{
    boxSizing:'border-box',
    width:'100%',
    minHeight:'30px',
    borderRadius:'0 0 2px 2px',
    border:'1px black solid',
    borderTop:'0px',
    background:'#e0d9d0',
    outline:'0',
    textAlign:'center'
  },
  textArea:{
    maxWidth:'100%',
    minWidth:'100%',
    minHeight:'40px',
    maxHeight:'40px',
    marginBottom:'-6px',
  },
  button:{
    width:'20%',
    marginTop:'1%',
    marginRight:'1%',
    paddingTop:'8px',
    paddingBottom:'8px',
    float:'right',
    border:'1px solid',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#E0BA51',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    backgroundImage: 'linear-gradient(#d55151, #55130f, #4b1310)',
    boxShadow:'inset 0 0 7px #9c7239',
    color:'white',
    outline:'0',
    borderRadius:'2px',
  },
  tableButton:{
    cursor: 'pointer',
    boxSizing:'border-box',
    width:'100%',
    paddingTop:'6px',
    paddingBottom:'6px',
    border:'1px solid black',
    boxShadow:'inset 0 0 7px #9c7239',
    color:'rgb(227, 228, 205)',
    outline:'0',
    borderBottomRightRadius:'4px',
    borderTopRightRadius:'4px',
    backgroundImage: 'linear-gradient( #dda553, #4b2f0d, #6f4d13 )',
    textAlign:'center',
    fontWeight:'600',
  },
  goldAndBrownTheme:{
    border:'2px solid',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#614722',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    boxShadow:'inset 0 0 8px #9c7239',
  },
  middleOption:{
    marginLeft:'0.5%',
    marginRight:'0.5%',
  },
  hSeparator:{
    height:'5px',
  },
  vSeparator:{
    width:'0.5%',
    display:'inline-block',
  },
  tabButton:{
    boxSizing:'border-box',
    display:'inline-block',
    position:'relative',
    width:'25%',
    textAlign:'center',
    paddingTop:'4px',
    paddingBottom:'4px',
    borderTopRightRadius:'5px',
    borderTopLeftRadius:'5px',
    fontWeight:'600',
    textShadow:'rgba(0, 0, 0, 0.6) 2px 2px 3px',
    color:'rgb(228, 226, 223)',
  },
  tabActive:{
    boxShadow:'none',
    borderBottom:'1px rgb(164, 129, 91) solid',
    background:'rgb(164, 129, 91)',
  },
  tabNotActive:{
    boxShadow:'inset 0 -2px 8px rgb(88, 72, 55)',
    background:'rgb(125, 100, 73)',
    borderTop:'2px solid #b8a678'
  },
  inputBlock:{
    boxShadow: '-12px 0 15px -4px rgb(99, 89, 66), 12px 0 15px -4px rgb(99, 89, 66)',
    marginBottom:'5px',
  },
  table:{
    boxSizing:'border-box',
      position: 'relative',
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0px',
      marginBottom:'0px',
  },
  tableHeaderCell:{
    display:'',
    border:'1px black solid',
    borderTopRightRadius:'5px',
    borderTopLeftRadius:'5px',
  },
  tableCell:{
    backgroundImage: 'linear-gradient(rgb(255, 255, 255), rgb(220, 220, 220), rgb(200, 200, 200))',
    border:'1px black solid',
//    borderTop:'0px',
    paddingTop:'6px',
    paddingBottom:'6px',
    paddingLeft:'4px',
  },
  scrollPanel:{
    boxSizing:'border-box',
    	overflowY:'scroll',
      maxHeight:'200px',
      width:'100%',
  },
};

const resp = StyleSheet.create({
  popupContent:{
    '@media (max-width: 720px)': {
      marginTop:'2%',
      width:'96%',
      marginLeft:'2%',
    },
    '@media (max-width: 480px)': {
      fontSize:'80%',
    },
  },
  button:{
    ':active':{
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
        color:'lightGrey',
        backgroundImage: 'linear-gradient( #4b110d, #6f1913, #dd5353 )',
      },
  },
  tableButton:{
    ':active':{
        color:'lightGrey',
        backgroundImage: 'linear-gradient( #4b2f0d, #6f4d13, #dda553 )',
      },
  },
  halfSize:{
    width:'49.75%',
    display:'inline-block',
  },
  thirdSize:{
    width:'33%',
    display:'inline-block',
  },
  optionContent:{
    width:'98%',
    marginLeft:'1%',
    marginRight:'1%',
    display:'inline-block',
  },
  content:{
    boxSizing:'border-box',
    paddingLeft:'8%',
    paddingRight:'8%',
    marginTop:'3%',
    marginBottom:'5%',
    height:'100%',
  },
  panel:{
    display:'block',
    background:'rgb(164, 129, 91)',
    position:'relative',
    width:'100%',
    boxSizing:'border-box',
    borderTopLeftRadius:'9px',
    borderTopRightRadius:'9px',
    borderTop:'0px',
  },
});


export {resp, styles};
