import error from '../error.png'
function Error404 () {
    return (
      <div className="error">
         <h1 className="mark-poll" >You Entered a wrong Page</h1>
         <img src={error} alt="error" style={{width: 600}} />;
       
      </div>
    );
}

export default Error404