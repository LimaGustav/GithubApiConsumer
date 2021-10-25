import { Component } from "react";
import './repos.css';

export default class repos extends Component{
    constructor(props){
        super(props);
        this.state = {
            listRepos: [],
            userName: "",
            id: "",
            name: "",
            description: "" ,
            dateCreation: "",
            size: 0
        }
    }

    searchReposByUserName = (subimit) => {
        subimit.preventDefault();

        console.log("Searching user repository's")
    
        fetch('https://api.github.com/users/' + this.state.userName +'/repos?per_page=10')

        .then(response => response.json())

        .then(status => status)

        .then(dado => this.setState({listRepos: dado}))

        .then(console.log("I got here"))

        .catch(erro => console.log(erro))
    }

    componentDidMount() {
        
    }

    updateStateUserName = async (event) => {
        
        await this.setState({
            userName: event.target.value
        })

        console.log(this.state.userName)
    }

    render(){
        return (
            <div>
                <main>
                    <h1>Repositórios</h1>
                    <section>
                        <form onSubmit={this.searchReposByUserName}>
                            <div>
                                <input
                                    type="text"
                                    value={this.state.userName}
                                    placeholder="Write the user name"
                                    onChange={this.updateStateUserName}
                                    className="input">
                                </input>

                                {
                                    <button type="submit" disabled={this.state.userName === '' ? 'none' : ''}>
                                        Pesquisar
                                    </button>
                                }
                            </div>
                        </form>
                    </section>

                    <section>
                        <table>
                            <thead>
                                <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.listRepos.filter((item, index) => index < 10).map(repos => {
                                        return (
                                        <tr key={repos.id}>
                                            <td>{repos.id}</td>
                                            <td>{repos.name}</td>
                                            <td>{repos.description}</td>
                                            <td>{repos.created_at}</td>
                                            <td>{repos.size}</td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                </main>

            </div>
        )
    }
}



