import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import 'date-fns';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      date: '',
      results: [],
      checked: false,
    }
  }

  handleChange = (e) => {
    const { target: { checked } } = e;
    this.setState({ checked });
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    // _results.data 아무것도 없음;
    this.setState({results: _results.data})
    console.log(_results)
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async(event) => {
    event.preventDefault()  //event 기능 -> 막는다.
    let result = await api.createPost({title:this.state.title, content:this.state.content, date:this.state.date})
    console.log("완료됨!!", result)
    this.setState({title:'', content:'', date:''})
    this.getPosts()
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  render() {
  return (
    <div className="App">
      <Container maxWidth="lg">
      <div className="PostSection">
        <Paper className="PostingPaper">
          <h2>목표 관리</h2>
          <form className="PostingForm" onSubmit={this.handlingSubmit}>

          <TextField
            id="outlined-name"
            label="목표"
            name="title"
            // className={classes.textField}
            value={this.state.title}
            onChange={this.handlingChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="detail"
            name="content"
            multiline
            rows="4"
            // className={classes.textField}
            value={this.state.content}
            onChange={this.handlingChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="date"
            label="Schedule"
            type="date"
            name="date"
            defaultValue="2019-12-31"
            value={this.state.date}
            onChange={this.handlingChange}
            // className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
          />

          <Button variant="outlined" color="primary" type="submit">제출하기</Button>
          </form>
        </Paper>
      </div>

      <div className="ViewSection">
        {
            this.state.results.map((post) =>
            <Card className={"card"}>
            <CardContent>
              <Typography>
                <PostView key={post.id} id={post.id} title={post.title} content={post.content} date={post.date}/>
              </Typography>
              완료<input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleChange}
                 />
            </CardContent>
            <CardActions>
              <Button color="secondary" size="small" onClick={(event)=>this.handlingDelete(post.id)}>삭제하기</Button>
            </CardActions>
          </Card>

            )
        }
      </div>
        </Container>
    </div>
  );
}
}
export default App;
