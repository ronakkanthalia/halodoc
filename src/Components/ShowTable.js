import React from 'react';

class ShowTable extends React.Component{

    callAPI = (page) => {
        this.props.callAPI(page);
    }

    render () {
        const searchResult = this.props.searchResult;
        return (
            <div className="col-md-12">
                <table border="1" width="100%">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author (Submission Count)</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            searchResult.map((data) => {
                                return (
                                    <tr key={data.objectID}>
                                        <td><a href={data.url} target="_blank">{data.title}</a></td>
                                        <td>{data.author} ({data.karma})</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                <tfoot>
                    <tr>
                        <td>{this.props.prevPage ? <button onClick={() => this.callAPI(this.props.prevPage)}>Prev</button> : null }</td>
                        <td>{this.props.nextPage ? <button onClick={() => this.callAPI(this.props.nextPage)}>Next</button> : null }</td>
                    </tr>                 
                </tfoot>
                </table>
            </div>
        )
    }
}
export default ShowTable;