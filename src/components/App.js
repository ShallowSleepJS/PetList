//React Components
import React, { Component } from 'react';



class App extends Component {
  constructor(props){
    super(props);
    this.addNewPetHandler = this.addNewPetHandler.bind(this);
    this.deletePetHandler = this.deletePetHandler.bind(this);
    this.editPetHandler = this.editPetHandler.bind(this);
    this.editTextHandler = this.editTextHandler.bind(this);
    this.updatePetHandler = this.updatePetHandler.bind(this);

    this.state = {
      text:{textName:"",textBreed:""},
      onEdit:0,
      pets:[
        {petID:1,petName:"Tora", breed:"Siberian Husky"},
        {petID:2,petName:"Ciel", breed:"Ragdoll Cat"},
        {petID:3,petName:"Barbie",breed:"Golden Retriver"},
        {petID:4,petName:"Candy", breed:"Border Collie"}
      ]
    };
  }//constructor

  //a life cycle method of Component, called only once after Component render to the DOM
  componentDidMount(){}//componentDidMount

  render() {
    return(
      <div>
        <h2>Fluffy Friends</h2>
        <PetList
          {...this.state}
          deletePet={this.deletePetHandler}
          editPet={this.editPetHandler} />
        <PetForm
          {...this.state}
          addNewPet={this.addNewPetHandler}
          editText={this.editTextHandler}
          updatePet={this.updatePetHandler} />
      </div>
    );
  }//App render

  addNewPetHandler(newPet){
    var pet = {petID: this.state.pets.length + 1 , petName: newPet.petName, breed: newPet.breed};
    this.setState({pets: this.state.pets.concat(pet)});
  }//addNewPetHandler

  deletePetHandler(petID){
    var pets = this.state.pets;
    for(var i = 0; i < pets.length; i++){
      if(pets[i].petID == petID){
        pets.splice(i,1)
      }
    }
    this.setState({pets:pets});
  }//deletePetHandler

  editPetHandler(pet){
    console.log("editPetHandler receive petID: "+ pet.breed);
    this.setState({onEdit: pet.petID, text:{textName:pet.petName,textBreed:pet.breed}});
  }//editPetHandler

  editTextHandler(text){
    this.setState({text:text});
  }//editTextHandler

  updatePetHandler(petUpdated){
    var pets = this.state.pets;
    for(var i = 0; i < pets.length; i++){
      if(pets[i].petID == petUpdated.petID){
        pets.splice(i,1,petUpdated);
      }
    }
    this.setState({pets: pets});
    this.setState({onEdit:0, text:{textName:"",textBreed:""}});
  }//updatePetHandler

}//App


class PetForm extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render(){
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="form-group col-6">
              <label>Pet Name: </label>
              <input type="text" className="form-control" ref="newPetName" onChange={this.onChange} value={this.props.text.textName}  />
            </div>
            <div className="form-group col-6">
              <label>Pet Breed: </label>
              <input type="text" className="form-control" ref="newBreed" onChange={this.onChange} value={this.props.text.textBreed}  />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
    );
  }

  onChange(e){
    e.preventDefault();
    var text1 = this.refs.newPetName.value.trim();
    var text2 = this.refs.newBreed.value.trim();
    var text = {textName: text1, textBreed:text2};
    this.props.editText(text);
  }//onChange

  onSubmit(e){
    e.preventDefault();
    var petName = this.refs.newPetName.value.trim();
    var breed = this.refs.newBreed.value.trim();
    if(!petName){
      alert("No Pet Name Input!");
      return;
    }if(!breed){
      alert("No Breed Info Input!");
      return;
    }
    var newPet = {petName: petName, breed: breed};
    if(this.props.onEdit){
      console.log("onEditting for: "+ this.props.onEdit);
      var petUpdated = {petID:this.props.onEdit,petName:this.props.text.textName, breed:this.props.text.textBreed};
      this.props.updatePet(petUpdated);
    }else{
      this.props.addNewPet(newPet);
    }

    this.refs.newPetName.value = "";
    this.refs.newBreed.value = "";
  }//onSubmit
}//PetForm


class PetList extends Component {
  constructor(props){
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  render(){
    return(
      <ul>
        {
          this.props.pets.map(pet => {
            return <li pet={pet} key={pet.petID}>
                      <a className="badge badge-light">Name: {pet.petName}</a>
                      <a className="badge badge-pill badge-light">Breed: {pet.breed}</a>
                      <span className="badge badge-warning" onClick={this.onEdit.bind(this,pet)}>Edit</span>
                      <span className="badge badge-danger" onClick={this.onDelete.bind(this,pet.petID)}>Delete</span>
                  </li>
          })
        }
      </ul>
    );
  }//render
  onDelete(petID){
    this.props.deletePet(petID);
  }//onDelete
  onEdit(pet){
    console.log("U've clicked Edit Btn for "+ pet.petID);
    this.props.editPet(pet);
  }//onEdit
}//PetList


export default App;
