import React, {Component} from 'react';
import axios from 'axios';
import View from './View';
import Article from './Article';
import AddArticleForm from './AddArticleForm';
import UpdateArticleForm from './UpdateArticleForm';
import './App.css';

var urlPrefix = 'http://localhost:4200/api'

class  App extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeView:'articles',
      articles:[
        {
          id:'',
          name:'',
          description: '',
          photo: ''
        }],
      articleToUpdate:{}
    }
  }

  getarticles = () => {
    axios.get(urlPrefix+'/articles')
    .then (res => {
      this.setState({articles:res.data})
    })
  }
  addArticle = (data) => {
    axios.post(urlPrefix+'/articles',data)
    .then(res => {
      this.getarticles()
    })
  }
  deleteArticle = (id) => {
    axios.delete(urlPrefix+'/articles/'+id)
    .then(res => {
      this.getarticles();
    })
  }
  updateArticle = (id,data) => {
    axios.put(urlPrefix+'/articles/'+id,data)
    .then(res => {
      this.getarticles()
    })
  }
  setArticleToUpdate = (id) => {
    var foundarticle = this.state.articles.find((article) =>{
      return article.id === id
    })
    this.setState({articleToUpdate:foundarticle})
  }
  setActiveView = (view) => {
    this.setState({activeView:view})
  }
  componentDidMount(){
    this.getarticles()
  }

  render(){

    return (
        <div className="app">
      
          <View viewName="articles" activeView={this.state.activeView} className="color1" >
            <div className="header">
              <i onClick={() => this.setActiveView('add-article')} className="fas fa-plus"></i>
              <i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i>
            </div>
            <div className="main">
              <h3>What's hapenning today...</h3>
              {
                this.state.articles.map((article) => {

                  var articleProps = {
                    ...article,
                    setActiveView: this.setActiveView,
                    deleteArticle: this.deleteArticle,
                    setArticleToUpdate: this.setArticleToUpdate,
                  }
                  return (<Article {...articleProps} />)
                })
              }
            </div>
          </View>

          <View viewName="add-article" activeView={this.state.activeView} className="color2" >
            <div className="header">
              <i onClick={() => this.setActiveView('articles')} className="fas fa-times"></i>
            </div>
            <div className="main">
              <h3>Add an article</h3>
              <AddArticleForm addArticle={this.addArticle} setActiveView={this.setActiveView}/>
            </div>
          </View>

          <View viewName="update-article" activeView={this.state.activeView} className="color3" >
            <div className="header">
              <i onClick={() => this.setActiveView('articles')} className="fas fa-times"></i>
            </div>
            <div className="main">
              <h3>Update a article</h3>
              <UpdateArticleForm {...this.state.articleToUpdate} updateArticle={this.updateArticle} setActiveView={this.setActiveView}/>
            </div>
          </View>

          <View viewName="nav" activeView={this.state.activeView} className="color5">
            <div className="header">
              <i onClick={() => this.setActiveView('articles')} className="fas fa-times"></i>
            </div>
            <div className="main">
              <ul className="menu">
                <li><a onClick={() => this.setActiveView('articles')} className="color1" href="#">Latest News</a></li>
                <li><a onClick={() => this.setActiveView('add-article')} className="color2" href="#">Submit a story</a></li>
              </ul>
            </div>
          </View>

        </div>
    );
  }
}

export default App
