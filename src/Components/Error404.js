import error from '../error.jpg'
function Error404 () {
    return (
      <div className="error">
         <h1>Wrong URL</h1>
         <img src={error} alt="error" style={{width: 600}} />;
       
      </div>
    );
}

export default Error404