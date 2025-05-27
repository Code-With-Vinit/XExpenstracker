

function Button({children,handleClick,type="button"}) {
  return (
    <Button
        onClick={handleClick}
        type={type}
    >
            {children}
    </Button>
  )
}

export default Button