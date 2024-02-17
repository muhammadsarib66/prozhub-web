import React from 'react' 
import "../components/Main.css"  
function Loading() {
    return (
      <div className="loading">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
  export default Loading;