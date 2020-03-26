import React from 'react';

class Search extends React.Component{

    state = {
        term:''
    }

    handleChange = (e) => {
        this.setState({
            term:e.target.value
        });
        this.props.setTerm(e.target.value);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.term != ''){
            this.props.callAPI();
        }
    }

    

    render(){
        const {term} = this.state;
        return (
            <div className="col-md-12 mt-4">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-3 col-md-offset-3">
                  <div className="form-group ">
                    <input type="text" className="form-control" value={term} onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="col-md-3">
                  <input type="submit" className="btn btn-primary" value="Search" />
                </div>
              </div>
            </form>
          </div>
        )
    }
}
export default Search;