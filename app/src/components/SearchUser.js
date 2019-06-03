import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
import { createUser } from '../actions/userActions';
import { exists } from 'fs';

class SearchUser extends Component{
    

   

    componentWillMount() {
        //this.props.fetchUser();
    }

    isEmpty = myObject => {
        for(var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    componentWillReceiveProps(nextProps){

        
        //console.log(nextProps.user);
        //console.log(nextProps.user_not_found);
        if(this.isEmpty(nextProps.user)){
            console.log("User not in database: ");
            console.log(nextProps.user_not_found);

            //Creates a new user in the database with information provided
            this.props.createUser(nextProps.user_not_found);
        }else{
            console.log("UIN match was found");
            console.log(nextProps.user);
        }
        /*
         if(nextProps.newPost) {
            this.props.students.unshift(nextProps.newPost); //add to beginning
        }
        */
    }

   

    searchUser(uin){
        
        this.props.fetchUser(uin)
        //console.log(this.props.createUser(this.props.user));
    }

    enterPressed(e){
        var keyValue = e.keyCode || e.which;
        if(keyValue === 13){
            this.checkId();
        }
    }

    checkId = () => {
        var typedUIN = document.getElementById('uinInput').value;
        if (typedUIN.length === 9){     
            this.searchUser(typedUIN);  
        }  
    }

    getText = () => {
        var textInput = document.getElementById('text').value;
        textInput = textInput.replace(/\s/g, ''); 
        this.count(textInput);
        
    }

    count = (textInput) =>{
        var total = textInput;
        total = total.replace(/\s/g, '');
        document.getElementById("total").innerHTML="Total Characters: " + (total.length);
        
        this.statusUpdate(total.length , total); 

    }
        
    statusUpdate = (len , text) => { //Param is the number of characters in the input field

        var maxLength = 79; //Total amount of characters for a successful card swipe
        var prefix = text.toString().substring(0, 2); //obtains the prefix characters of the input (ex. %B)  


        //TODO check creat diagram
        document.getElementById("prefix").innerHTML= "Prefix: " + prefix;

            if (len === 0){ 
                document.getElementById("status").innerHTML="Status: " + "Please Swipe Card";
            }
            if (len === maxLength && prefix === "%B"){
                document.getElementById("status").innerHTML="Status: " + "Success"; //Card was read properly
                this.getUIN(text); //Calls the function getUIN() to obtain the UIN substring
            }
            else{
                document.getElementById("status").innerHTML="Status: " + "Error, please swipe again"; //Card did NOT read properly
            }
    }

    /* 
     * called if UIN is obtainable 
     * searches UIN in the database,
     * displays info for matching UIN
     */ 
    
     getUIN = (text) => {
        var uin = text.substring(54, 63); //Obtains the string of the UIN
        document.getElementById("uinID").innerHTML="UIN: " + uin;
        this.props.fetchUser(uin);
    }

    render(){

            const data = this.props.user;

            const swipeSearch = (
                <div class = "searchUser">
                    <h1>Swipe Check In: </h1>
                    <input id = "text" type="text" onInput={this.getText}></input>
                    <p id = "total"> Total Characters: 0</p>
                    <p id = "status"> Status: Please Swipe Card</p>
                    <p id = "uinID">UIN: </p>
                    <p id="prefix">Prefix: </p>
                </div>
            )

            const manualSearch = (
                <div class="searchUser">
                    <h1> Manual Check In: </h1>
                    <form id = "manualForm" onSubmit = {e => e.preventDefault()} onKeyPress={this.enterPressed.bind(this)}>
                        UIN:<br></br>
                        <input type="text" id="uinInput" value= {this.props.searchString} required minLength="9" maxLength="9" ></input>
                        <br></br>
                        <button id="checkinBtn"  type="button" onClick={this.checkId}>Manual Checkin</button>
                    </form>
                </div>
            );
            
            const userItem = (
                <div key={data.uin}>
                    <p>{data.firstName} {data.lastName}</p>
                    <p>UIN: {data.uin}</p>
                    <p>RSVP: {data.rsvp}</p>
                    <p>Checked In: {data.checkIn}</p>
                    <br></br>
                </div>
            );
            
       

        return (
            <div>
                {swipeSearch}
                {manualSearch}
                {userItem}

            </div>
        )
    }

}

SearchUser.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,   
    user: PropTypes.object,
    user_not_found: PropTypes.object
}

const mapStateToProps = state => (
{
    user: state.student.found,
    user_not_found: state.student.not_found
}
)


export default connect(mapStateToProps, { fetchUser , createUser})(SearchUser);