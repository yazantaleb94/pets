import React from 'react';
import {Pet} from "../components";
import {getPets} from "../constants";
import {stringContains} from "../helpers";
import InfiniteScroll from "react-infinite-scroll-component";


class PetList extends React.Component{
    breed;
    constructor(props){
        super(props);
        this.state = {
            _pets: [],
            pets: [],
            yukleniyor: true,
            items:Array.from({length: 4}),
            hasmore:true
        }
    }

    componentDidMount() {
        getPets().then((data) => {
            this.setState({
                _pets: data,
                pets: data,
                yukleniyor: false
            })
        })
    }

    goruntuekle=()=>{
        if(this.state.pets.length>=37){
            this.setState({
                 hasmore:false
            });
            return;
        }
        setTimeout(()=>{
            this.setState={
                    item:this.state.items.concat(Array.from({length :4}))
            };

        },1500);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeFilter !== this.props.activeFilter){
            this.filterPets();
        }
        if(prevProps.searchValue !== this.props.searchValue){
            this.filterPets();
        }
    }
    filterPets = () => {
        if(!this.props.activeFilter){
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return stringContains(pet.name, this.props.searchValue)
                })
            })
        }else{
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return pet.breed === this.props.activeFilter;
                }).filter((filteredPet) => {
                    return stringContains(filteredPet.name, this.props.searchValue)
                })
            })
        }
    }
    render(){
        const Yukleniyor = <div>Yukleniyor</div>;
        const EmptyPets = <div>Bulunamadı</div>;
        const Pets =  [<h3>Gösterilen Pet Sayısı: {this.state.pets.length}</h3>,

            <div id="scrollableDiv" style={{overflow:"auto"}}>

            <InfiniteScroll
                dataLength={this.state.pets.length}
                next={this.goruntuekle}
                hasMore={this.state.hasmore}
                loader={<div className="loader" key={0}>loading...</div>}
                endMessage={
                    <p style={{textAlign:"center"}}>the END!</p>
                }
                scrollableTarget="scrollableDiv">

             <div className="row">
            {
                this.state.pets.map((pet) => {
                    return <Pet key={Math.random()} {...pet} />
                })

            }
        </div>];

        </InfiniteScroll>
        </div>

        ];

        if(this.state.yukleniyor){
            return Yukleniyor;
        }else if(this.state.pets.length === 0){
            return EmptyPets
        }else{
            return Pets;
        }
    }

}
export default PetList;