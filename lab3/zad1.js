var setBtn = document.getElementById("set")
var resetBtn = document.getElementById("reset")

setBtn.addEventListener('click', setStyle)
resetBtn.addEventListener('click', resetStyle)

function setStyle(){
    var style = document.getElementsByTagName("style")[0]
    if(!style){
        style = document.createElement('style');
        style.innerHTML = `.azure{
                                border: solid 2px #A8A8A8;
                                background-color: #EFF;
                                -webkit-box-shadow: 0px 0px 15px -1px #000000; 
                                box-shadow: 0px 0px 15px -1px #000000;
                                padding: 5px;
                                margin: 5px;
                            }
                            
                            body{
                                font-size: 2.5vw
                            } 
                            
                            aside  {
                                float: right;
                                width: 50%;
                            }
                            
                            footer {
                                display: flex;
                                flex-direction: column;
                            }
                            
                            main {
                                clear: left; 
                                /* display: flex;
                                flex-direction: column; */
                                width: 35%;
                                
                            }
                            
                            nav {
                                width: fit-content;
                                float: left;
                            }
                            
                            blockquote{
                                margin: 0;
                            }
                            
                            #sidePanel{
                                animation: pulsowanie 2s infinite alternate;
                                -webkit-animation: pulsowanie 2s infinite alternate;
                            }
                            
                            @keyframes pulsowanie
                            {
                            from {color:red;}
                            to {color:blue}
                            }
                            @-webkit-keyframes pulsowanie
                            {
                            from {color:red;}
                            to {color:blue;}
                            }
                            
                            /* Media Query For Phones, Basically Breakpoint For Phones Is 480px, But For Tests I Set 600px*/
                            @media screen and (max-width: 600px) {
                                aside  {
                                    float: none;
                                    display: block;
                                    width: auto;
                                }
                                
                                footer {
                                    display: block;
                                }
                                
                                header {
                                    display: block;
                                }
                                
                                main {
                                    display:block;  
                                    width: auto;
                                }
                                
                                nav {
                                    float:none;
                                    display: block;
                                    width: auto;
                                }
                                
                                blockquote{
                                    margin: 0;
                                }
                            }`;
        document.getElementsByTagName('head')[0].appendChild(style);
    }else{
        console.log("Dokument juz posiada styl!");
    }
}

function resetStyle(){
    var style = document.getElementsByTagName("style")[0]
    if(style){
        document.getElementsByTagName("head")[0].removeChild(style);
    }else{
        console.log("Znacznik style nie istnieje!");
    }
    
}