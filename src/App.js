import {Component} from "react"
import { FaRupeeSign } from 'react-icons/fa';
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md';
import './App.css'



class App extends Component{
  state ={name: "",amount: "", total: 0}

  onChangeInput = event =>{
    this.setState({amount:event.target.value})
  }

  onChangeName = event =>{
    this.setState({name:event.target.value })
  }
  

//  
  creditAmount =() =>{
    const {name, amount, total} = this.state
    if(name === "" || amount === ""){
      alert("Enter valid Name and Amount")
    }else{
    let update = localStorage.getItem("Todo")
    let parssed = JSON.parse(update)
    let date = new Date()
    let fullDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    const updateData = {
      name: name,
      amount: parseInt(amount),
      credit: parseInt(amount),
      debit : "",
      date: fullDate,
      totalAmount: parseInt(amount) + total
    }
    if(parssed == null){
      parssed =[]
    }
    parssed.push(updateData)
    localStorage.setItem('Todo', JSON.stringify(parssed))
    this.setState(prevState =>({total: prevState.total+parseInt(amount),name:"", amount:""}))
  }
  }


//
  debitAmount = () =>{
    const {name, amount, total} = this.state
    if(name === "" || amount === ""){
      alert("Enter valid Name and Amount")
    }else{
    let update = localStorage.getItem("Todo")
    let parssed = JSON.parse(update)
    let date = new Date()
    let fullDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    const updateData = {
      name: name,
      amount: parseInt(amount),
      credit: "",
      debit : parseInt(amount),
      date: fullDate,
      totalAmount: total -parseInt(amount)
    }
    if(parssed == null){
      parssed =[]
    }
    parssed.push(updateData)
    localStorage.setItem('Todo', JSON.stringify(parssed))
    this.setState(prevState =>({total: prevState.total-parseInt(amount),name:"", amount:""}))
  }
  }


  //
  renderData = () =>{
    const  getData = localStorage.getItem("Todo");
    const parsed = JSON.parse(getData)
    let data = []
    if(parsed=== null){
      data =[]
    }else{
      data =parsed
    }
    return(
      <table>
       <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Credit</th>
          <th>Debit</th> 
          <th>Date</th>
          <th>Total Amount</th>
    </tr>
    {data.map(every =>{
      return(
      <tr>
        <td>{every.name}</td>
        <td>{every.amount}</td>
        <td className="credit">{every.credit}</td>
        <td className="debit">{every.debit}</td>
        <td>{every.date}</td>
        <td>{every.totalAmount}</td>
      </tr>
    )})}
    
    </table>

    )
  }


//
  componentDidMount(){
    const getAmount = localStorage.getItem("Todo")
    const parsedAmount = JSON.parse(getAmount)
    let change = 0
    let credit =0
    let debit =0
    if(parsedAmount === null){
      this.setState({total: change})
    }
    else{
       credit = parsedAmount.reduce((total, each) => parseInt(total) + each.credit,0 );
       debit = parsedAmount.reduce((total, each) => parseInt(total) + each.debit,0);
       console.log(credit);
       console.log(debit)
       change = credit - debit

    }
    
     this.setState({total:change})
  }

 // 
  render(){
    const {name,amount,total} = this.state
    
    return(
      <div className="main-container">
        <h1>Track Your Expendeture</h1>
        <h3>Your Total Amount: {total}</h3>
        <form className="form-container">
        <div className="amount-container">
          <MdOutlineDriveFileRenameOutline/>
        <input type="text" placeholder="Enter Name" className="input-form" value={name} onChange={this.onChangeName}/>
        </div>
        <div className="amount-container">
          <FaRupeeSign className="rupee-icon"/>
          <input type="text" placeholder="Enter Amount" className="input-form" value={amount} onChange={this.onChangeInput}/>
          </div>
        </form>
        <div className="button-container">
          <button type="button" className="button" onClick={this.creditAmount}>CREDIT</button>
          <button type="button" className="button" onClick={this.debitAmount}>DEBIT</button>
          </div>
         {this.renderData()}
              
      </div>
    )
  }
}
export default App;
