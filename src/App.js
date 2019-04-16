import React, { Component } from 'react';
import Context from './component/Context';
import Home from './component/Home/Home';
import SlidBar from './component/AddCourse/SlideBar';
import AddLecture from './component/AddCourse/AddLecture';
import MyCourses from './component/myCourses/MyCourses';
import LoginAndRegister from './component/loginAndRegister/loginAndRegister';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
import Dashboard2 from './component/dashboard/Dashboard2';
import ShowPackages from './component/packages/showPackages';
import CoursesByCategory from './component/coursesByCategory/coursesByCategory';
import Package from './component/packages/package';
import HeaderCourses from './component/courses/headerCourses';
import ContentCourses from './component/courses/contentCourses';
import HeaderAllCourses from './component/allCorses/HeaderAllCourses';
import ContentAllCourses from './component/allCorses/ContentAllCourses';
import axios from 'axios';
import host from './component/Host';
import './App.css';
import './assets/dashboard/Dashboard.css';
import Cookies from "universal-cookie";

const cookies = new Cookies();


class App extends Component {
  constructor() {
    super();
    this.state = {
      headerCource: [],
      packageId: '',
      auth:"",
      session:[]
    }
  }
  componentDidMount() {
    if (cookies.get("token")) {
      var headers = { "Content-Type": "application/json", token: cookies.get("token") };
      axios.get(host+ `api/user/checklogin`, 
      { headers: headers })
          .then(response =>  { 
            console.log(response.data[1].sesson)
              this.setState({ 
                auth: response.data[0].auth,
                session: response.data[1].sesson
              }) 
            })
          .catch((error) => { 
            console.log('error ' + error) 
          }) 
    }
  
}

  state = {}
  render() {
    return (<Context.Provider value={{
      value: this.state,
      action: {
        HeaderCource: (corse) => {
          this.setState({ headerCource: corse })
          console.log(corse);
          

        },
      }
    }}>
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Home} />
          <Route path='/addlecture/:id' component={AddLecture} />
          <Route path='/Addcourses' component={SlidBar} />
          <Route path='/dashboard1' component={Dashboard} />
          <Route path='/dashboard2' component={Dashboard2} />
          <Route path='/allcourses' component={HeaderAllCourses}/>
          <Route path='/allcourses' component={ContentAllCourses}/>
          <Route path='/courses/:id' component={HeaderCourses}/>
          <Route path='/courses/:id' component={ContentCourses}/>
          <Route path='/mycourses' component={MyCourses} />
          <Route path='/ShowPackages' component={ShowPackages} />
          <Route path='/coursepackage/:id' component={Package} />
          <Route path='/CoursesByCategory/:id' component={CoursesByCategory}/>
     
         
         
          <LoginAndRegister />

        </div>
      </BrowserRouter>
    </Context.Provider>
    );
  }
}

export default App;
