import Button from "../../components/Button/Button";

function Card({title,money,buttonText,buttonType,handleClick,success=true}) {


  return (
    <div>
        <h3>
            {`${title}`}
            <span>
                {`₹${money}`}
            </span>
        </h3>

        <Button handleClick={handleClick} style={buttonType}>{buttonText}</Button>
    </div>
  )
}

export default Card