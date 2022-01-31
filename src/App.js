import {Component} from "react"
import { FaRupeeSign } from 'react-icons/fa';
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md';
import './App.css'



class App extends Component{
  state ={name: "",amount: "", total: 0, select:"Credit"}

  onChangeInput = event =>{
    this.setState({amount: event.target.value})
  }

  onChangeName = event =>{
    this.setState({name: event.target.value })
  }

  onChangeOption = event =>{
    this.setState({select: event.target.value})
  }
  

//  
  

  onSubmit = () =>{
    const {name, amount, total, select} = this.state;

    let update = localStorage.getItem("Todo")
    let parssed = JSON.parse(update)
    let date = new Date()
    let fullDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    if(parssed == null){
      parssed =[]
    }

    const updateData = {
      id:parssed.length+1,
      name: name,
      amount: `${parseInt(amount)}.00`,
      credit: (select === "Credit")? `${parseInt(amount)}.00`: "",
      debit : (select === "Debit")? `${parseInt(amount)}.00`: "",
      date: fullDate,
      totalAmount: (select === "Credit") ? `${parseInt(amount) + total}.00`: `${total -parseInt(amount)}.00`
    }
    
    parssed.push(updateData)
    localStorage.setItem('Todo', JSON.stringify(parssed))
    this.setState(prevState =>({total: (select === "Credit") ?prevState.total+parseInt(amount):prevState.total-parseInt(amount),name:"", amount:""}))
  
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
          <th>S.No</th>
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
        <td>{every.id}</td>
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
    const {name,amount,total, select} = this.state
    
    return(
      <div className="main-container">
        <h1>Track Your Expenditure</h1>
        <h3>Your Total Amount: {total}.00</h3>
        <form className="form-container" onSubmit={this.onSubmit}>
            <div className="amount-container">
                <MdOutlineDriveFileRenameOutline />
                <input type="text" placeholder="Enter Name" className="input-form" value={name} onChange={this.onChangeName} required/>
            </div>
            <div className="amount-container">
                <FaRupeeSign className="rupee-icon"/>
                <input type="text" placeholder="Enter Amount" className="input-form" value={amount} onChange={this.onChangeInput} required/>
            </div>
            <div >
                <select onChange={this.onChangeOption} className="option-container" value={select}>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                </select>
            </div>
            <button className="button" type="submit">ADD</button>
        </form>
        
        {this.renderData()}
              
      </div>
    )
  }
}
export default App;
