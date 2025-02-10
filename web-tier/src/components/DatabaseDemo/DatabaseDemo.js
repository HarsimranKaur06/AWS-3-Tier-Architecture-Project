
    import React, {Component} from 'react';
    import './DatabaseDemo.css';

    class DatabaseDemo extends Component {
     
        constructor(props) {
            super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
            this.handleTextChange = this.handleTextChange.bind(this);
            this.handleButtonClick = this.handleButtonClick.bind(this);
            this.handleButtonClickDel = this.handleButtonClickDel.bind(this);
            this.state = { 
               transactions: [],
               text_productcode: "",
               text_quantity: ""
            }
         }

         componentDidMount() {
            this.populateData();
          }

        populateData(){
            this.fetch_retry('/api/transaction',3)
            .then(res => res.json())
            .then((data) => {
              this.setState({ transactions : data.result });
              console.log("state set");
              console.log(this.state.transactions);
            })
            .catch(console.log);
        }  

        async fetch_retry(url, n){
            try {
                return await fetch(url)
            } catch(err) {
                if (n === 1) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                return await this.fetch_retry(url, n - 1);
            }
        };


          renderTableData() {
            return this.state.transactions.map((transaction, index) => {
               const { id, productcode, quantity} = transaction //destructuring
               return (
                  <tr key={id}>
                     <td>{id}</td>
                     <td>{productcode}</td>
                     <td>{quantity}</td>
                  </tr>
               )
            })
         }

        handleButtonClickDel(){
           const requestOptions = {
               method: 'DELETE'
           }
           fetch('/api/transaction', requestOptions)
           .then(response => response.json())
           .then(data => this.populateData())

           this.setState({text_productcode : "", text_quantity: "",transaction:[]});

        }

         handleButtonClick(){
             console.log(this.state.text_productcode);
             console.log(this.state.text_quantity);
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"productcode":this.state.text_productcode, "quantity" :this.state.text_quantity})
            }
            
            fetch('/api/transaction', requestOptions)
            .then(response => response.json())
            .then(data => this.populateData())
            
            this.setState({text_productcode : "", text_quantity:""});

         }

         handleTextChange(e){
            this.setState({[e.target.name]:e.target.value})
         }

         generateOrderNumber = () => {
            const orderNumber = Math.floor(Math.random() * 100000); // generate a random 5-digit number
            const message = `
            <p>Order Number: ${orderNumber}</p>
            <p>Email a snippet of your cart items and order number to <a href="mailto:Jordon@sales.com">Jordon@sales.com</a> to begin the order process.</p>
            <p>Expect confirmation within 2 hours.</p>
          `;
          document.getElementById("order-message").innerHTML = message; // display the message
          }
         
        

        render () {
        return (
            
            <div>
            <div id="order-message" style={{ marginBottom: '50px' }}></div>
            <h1 id='title' style={{paddingRight:"1em"}}>Add to Cart</h1>
            <div style={{ textAlign: 'right', marginBottom: '1em' }}>
                <input type="button" value="DEL" onClick={this.handleButtonClickDel} />
                <input type="button" value="ORDER" onClick={this.generateOrderNumber} />
            </div>
            <table id='transactions'>
               <tbody>
                   <tr id='heading'>
                        <th>ID</th>
                        <th>PRODUCT CODE</th>
                        <th>QUANTITY</th>
                   </tr>
                   <tr>
                        <td><input type = "button" value ="ADD" onClick={this.handleButtonClick}/></td>
                        <td><input type="text" name ="text_productcode" value = {this.state.text_productcode} onChange={this.handleTextChange}/></td>
                        <td><input type="text" name = "text_quantity" value = {this.state.text_quantity} onChange={this.handleTextChange}/></td>
                   </tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>

        );
      }
    }

    export default DatabaseDemo;