import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Edit from './pages/Profile/Edit';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/search">
          <Layout>
            <Search />
          </Layout>
        </Route>
        <Route
          path="/album/:id"
          render={ ({ match }) => (
            <Layout>
              <Album id={ match.params.id } />
            </Layout>
          ) }
        />

        <Route path="/favorites">
          <Layout>
            <Favorites />
          </Layout>
        </Route>
        <Route path="/profile" exact>
          <Layout>
            <Profile />
          </Layout>
        </Route>
        <Route path="/profile/Edit">
          <Layout>
            <Edit />
          </Layout>
        </Route>
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
