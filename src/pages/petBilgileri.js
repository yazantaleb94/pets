import React from 'react';
import Axios from 'axios';
class PetBilgileri extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            pets:[]
        }
    }
    componentDidMount(){
        Axios.get(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${this.props.match.params.id}`)
        .then(pet => {
            this.setState({
                pets:pet.data
            })
        })
    }
    render(){
        const {name, image, age, description, breed} = this.state.pets;
        return(
            <div>
               <img className="card-img-top" src={image} alt="" style={{marginTop:"20px", height: "292px" ,width:"300px"}}/>
                <div className="card-body">
                    <h4 className="card-title">
                        <a href="#">{name}</a>
                        <div>
                            <span className="badge badge-primary" style={{fontSize: "12px"}}>{breed}</span>
                        </div>
                        <div>
                            <span className="badge badge-warning" style={{fontSize: "12px"}}>{age}</span>
                        </div>
                    </h4>
                    <p className="card-text">
                        {description}
                    </p>
                </div>
                <div className="card-footer">
                    <div className="btn btn-success">Favorilere Ekle</div>
                </div>
            </div>
        )
    }
}
export default PetBilgileri;