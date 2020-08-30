import React, {Component} from 'react'

class  Article extends Component {

    handleUpdateClick = () => {
        var {setActiveView,setArticleToUpdate,id} = this.props
        setArticleToUpdate(id)
        setActiveView('update-article')
    }
	handleTrashClick = () => {
		var {deleteArticle,id} = this.props
		deleteArticle(id)
	}

  	render(){
	  	var {name,description,photo} = this.props
	    return (
	      <div className="card project">
	        <img className="card-img-top" src={photo} alt="News Article Image" />
	        <div className="card-body">
	          <h5 className="card-title">{name}</h5>
	          <p className="card-text">{description}</p>
	          <p>
	            <i className="fas fa-heart"></i>
	            <i onClick={this.handleUpdateClick} className="fas fa-edit"></i>
	            <i onClick={this.handleTrashClick} className="fas fa-trash"></i>
	          </p>
	        </div>
	      </div>
	    )
  	}
}

export default Article
