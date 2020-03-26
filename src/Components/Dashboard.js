import React from 'react';
import Search from './Search';
import axios from 'axios';
import ShowTable from './ShowTable';

class Dashboard extends React.Component{

    state = {
        term:'',
        page:0,
        prevPage:null,
        nextPage:null,
        searchResult:[]
    }

    setTerm = (term) => {
        this.setState({
            term
        });
    };

    callAPI = (page = 0) => {
        if(this.state.term!=''){
            let _this = this;
            let results = [];
            const url = 'http://hn.algolia.com/api/v1/search?query=' + this.state.term + '&page=' + page;
            axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response);
                if(response.data.hits.length!=0){
                    results = response.data.hits;

                    let promises = [];
                    for (let i = 0; i < results.length; i++) {
                        promises.push(
                            axios.get('http://hn.algolia.com/api/v1/users/' + results[0].author)
                            .then(res => {
                            // do something with response
                                console.log(res);
                                results[i].karma = res.data.submission_count;
                            })
                        )
                    }

                    Promise.all(promises).then(() => {
                        _this.setState({
                            searchResult:results,
                            nextPage:response.data.nbPages > response.data.page +1 ? response.data.page +1 : null,
                            prevPage:response.data.page!=0 ? response.data.page-1 : null
                        });
                    });
                }else{

                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }
        
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <Search callAPI={this.callAPI} setTerm={this.setTerm}/>
                    <ShowTable searchResult={this.state.searchResult} nextPage={this.state.nextPage} prevPage={this.state.prevPage} callAPI={this.callAPI}/>
                </div>
            </div>
        )
    }
}
export default Dashboard;