import {React,useState,useEffect} from "react";
import Card from "../../components/Card/Card";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/Barchart";


function Home() {

    const [balance,setBalance]= useState(0);
    const [expenses,setExpenses]=useState(0);
    const [expenseList,setExpenseList]=useState([]);
    const [isMounted,setIsMounted]=useState(false);


    const [isOpenExpense, setIsOpenExpense] = useState(false);
    const [isOpenBalance, setIsOpenBalance] = useState(false);


    const[categorySpends,setCategorySpends]=useState({
        food:0,
        entertainment:0,
        travel:0
    });

    const[categoryCount,setCategoryCount]=useState({
        food:0,
        entertainment:0,
        travel:0
    });




    useEffect(()=>{
        const localbalance=localStorage.getItem("balance");

        if(localbalance)
        {
            setBalance(Number(localbalance));
        }
        else{
            setBalance(5000);
            localStorage.setItem("balance",5000);
        }

        const items=JSON.parse(localStorage.getItem("expenses"));

        setExpenseList(items || []);
        setIsMounted(true);
    },[])


    useEffect(()=>{
        if(expenseList.length>0 || isMounted===true)
        {
            localStorage.setItem("expenses",JSON.stringify(expenseList));
        }


        if(expenseList.length>0)
        {
            setExpenses(
                expenseList.reduce((accumulator,currentValue)=>{
                    return accumulator+Number(currentValue.price);
            },0)
            );
        }
        else{
            setExpenses(0);
        }

        let foodSpends=0,entertainmentSpends=0,travelSpends=0;
        let foodCount=0,entertainmentCount=0,travelCount=0;

        expenseList.forEach((item)=>{
            if(item.category==="food")
            {
                foodSpends+=Number(item.price);
                foodCount++;
            }
            else if(item.category==="entertainment")
            {
                entertainmentSpends+=Number(item.price);
                entertainmentCount++;
            }
            else{
                travelSpends+=Number(item.price);
                travelCount++;
            }
        });


        setCategorySpends({
            food:foodSpends,
            entertainment:entertainmentSpends,
            travel:travelSpends
        });

        setCategoryCount({
            food:foodCount,
            entertainment:entertainmentCount,
            travel:travelCount
        });

    },[expenseList]);

    useEffect(()=>{
        if(isMounted)
        {
            localStorage.setItem("balance",balance);
        }
    },[balance])

//   <div className={styles.container}>
  return (
    <div>
        <h1>Expense Tracker</h1>

        {/* Cards and PieChart Wrapper */}

        <div>

            <Card
                title="Wallet Balance"
                money={balance}
                buttonText="+ Add Income"
                buttonType="Success"
                handleClick={()=>{
                    setIsOpenBalance(true);
                }}
            />

            <Card
                title="Expenses"
                money={expenses}
                buttonText="+ Add Expense"
                buttonType="failure"
                success={false}
                handleClick={()=>{
                    setIsOpenExpense(true);
                }}
            />


            <PieChart
                data={[
                {name:"Food",value:categorySpends.food},
                {name:"Entertainment",value:categorySpends.entertainment},
                {name:"Travel",value:categorySpends.travel}
                ]}
            />

        </div>


        {/* Transactions and BarChart Wrapper */}

        <div>

            <BarChart
                data={[
                {name:"Food",value:categoryCount.food},
                {name:"Entertainment",value:categoryCount.entertainment},
                {name:"Travel",value:categoryCount.travel}
                ]}
            />
             
            



        </div>



    </div>
  )
}

export default Home


