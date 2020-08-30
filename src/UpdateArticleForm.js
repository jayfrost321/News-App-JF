import React, {Component} from 'react';

class  UpdateArticleForm extends Component {

	constructor(props){
		super(props);
	}

	handleUpdateClick = () => {
		var {setActiveView, setArticleToUpdate, id} = this.props
		setArticleToUpdate(id)
		setActiveView('update-article')
	}
	handleFormSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData(this.updateForm);
        var data = {
            name:formData.get('name-input'),
			description:formData.get('description-input'),
			photo:formData.get('photo-input')
        }
        var {updateArticle,id,setActiveView} = this.props
        updateArticle(id,data)
        setActiveView('articles')
    }


  	render(){
		var {name, description, photo} = this.props
    	return (
			<form onSubmit={this.handleFormSubmit} ref={(el) => {this.updateForm = el}}>
		        <div className="form-group">
		          <label htmlFor="name-input">Name</label>
		          <input type="text" className="form-control" name="name-input" id="name-input" defaultValue={name} />
		        </div>
		        <div className="form-group">
		          <label htmlFor="name-input">Description</label>
		          <input type="text" className="form-control" name="description-input" id="description-input" defaultValue={description}/>
		        </div>

		        <div className="form-group">
		          <label htmlFor="name-input">Photo</label>
		          <input type="text" className="form-control" name="photo-input" id="photo-input" defaultValue={photo}/>
		        </div>

		        <div className="form-group">
		          <label htmlFor="type-input">Type</label>
		          <select className="form-control" name="type-input" id="type-input">
		            <option value="1">Painting</option>
		            <option value="2">Sculpture</option>
		            <option value="3">Digital</option>
		          </select>
		        </div>

		        <button type="submit" className="btn btn-primary">Update</button>
		    </form>

    	);
  	}
}

export default UpdateArticleForm
