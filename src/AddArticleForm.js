import React, {Component} from 'react';

class  AddArticleForm extends Component {

	constructor(props){
		super(props);
	}

	handleFormSubmit = (e) => {
        e.preventDefault()
        var formData = new FormData(this.addForm)
        var data = {
            name:formData.get('name-input'),
			description:formData.get('description-input'),
			photo:formData.get('photo-input'),
            type_id: parseInt(formData.get('type-input'))
        }

        var {addArticle,setActiveView} = this.props
        addArticle(data)
        setActiveView('articles')
    }


  	render(){
    	return (
			<form onSubmit={this.handleFormSubmit} ref={(el) => {this.addForm = el}}>
			
	        <div className="form-group">
	          <label htmlFor="name-input">Name</label>
	          <input type="text" className="form-control" name="name-input" id="name-input" placeholder="Enter article name"/>
	        </div>

	        <div className="form-group">
	          <label htmlFor="name-input">Description</label>
	          <input type="text" className="form-control" name="description-input" id="description-input" placeholder="Enter story description"/>
	        </div>

	        <div className="form-group">
	          <label htmlFor="name-input">Photo</label>
	          <input type="text" className="form-control" name="photo-input" id="photo-input" placeholder="FORMAT: /images/<name>.jpg"/>
	        </div>

	        <div className="form-group">
	          <label htmlFor="type-input">Category</label>
	          <select className="form-control" name="type-input" id="type-input">
	            <option value="1">Politics</option>
	            <option value="2">Sports</option>
	            <option value="3">Health</option>
	          </select>
	        </div>
	        <button type="submit" className="btn btn-primary">Add</button>
	    </form>
    	);
  	}
}

export default AddArticleForm
