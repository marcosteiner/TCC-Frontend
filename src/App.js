import React from 'react';
import { Grid, Table, Button, Icon, Header, Input } from 'semantic-ui-react';
import {getUserData, createUser} from './converter';
import {getAsyncUsers} from './api';

const Container = (props) => (
  <Grid celled='internally'>
    <GridHead/>
    <TotalCount users={props.users}/>
    <GridBody 
      users={props.users} 
      onDelete={(index) => props.onDelete(index)}
      onIncrease={(indexOfUser, indexOfCoffee) => props.onIncrease(indexOfUser, indexOfCoffee)}
    />
    <GridFoot onAdd={(username) => props.onAdd(username)}/>
  </Grid>
)

const GridHead = (props) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h1'>The Coffee Couter (TCC)</Header>
      </Grid.Column>
    </Grid.Row>
  );
}

const TotalCount = (props) => {
  let totalCount = coffeeSum(props.users);
  
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as='h3'>Total: {totalCount} Coffees</Header>
      </Grid.Column>
    </Grid.Row>
  );
}

const coffeeSum = (users) => {
  let sum = 0;
  for (let user of users){
    sum += individualCoffeeSum(user)
  }
  return sum;
}

const individualCoffeeSum = (user) => {
  let sum = 0;
  for(let coffee of user.consumptionData){
    sum += coffee.consumed;
  }
  return sum;
}

const GridBody = (props) => {
  let userIndex = -1;
  return props.users.map(u => {
    let coffeeCount = individualCoffeeSum(u)
    let rowKey = `${u.name}-${coffeeCount}`
    userIndex++;
    return (
      <Grid.Row key={rowKey}>
        <Grid.Column>
          <Element 
            username={u.name} 
            userIndex={userIndex}
            consumptionData={u.consumptionData} 
            coffeeCount={coffeeCount} 
            onDelete={(index) => props.onDelete(index)}
            onIncrease={(indexOfUser, indexOfCoffee) => props.onIncrease(indexOfUser, indexOfCoffee)}
          />
        </Grid.Column>
    </Grid.Row>
    )
  });
}

const Element = (props) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row key={props.coffeeCount}>
          <Table.HeaderCell colSpan='2'>
          {props.username}
          &nbsp;
          &nbsp;
          &nbsp;
          <Button icon onClick={() => props.onDelete(props.userIndex)}>
            <Icon name='trash alternate' />
          </Button>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan='1'>{props.coffeeCount} Coffees</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <CoffeeData 
            consumptionData={props.consumptionData}
            onIncrease={(indexOfUser, indexOfCoffee) => props.onIncrease(indexOfUser, indexOfCoffee)}
            userIndex={props.userIndex}
          />
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

class AddUser extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      username: ""
    };
  }

  handleChange(event){
    this.setState({
      username: event.target.value
    })
  }

  render(){ 
    return (
      <div class="ui massive icon input">
          <Input
          icon='user'
          iconPosition='left'
          placeholder='Enter Username'
          onChange={(e) => this.handleChange(e)} 
        />
        <Button 
        basic 
        icon 
        labelPosition='right' 
        color='red' 
        onClick={() => {this.props.onAdd(this.state.username)}}>
          Add User
          <Icon name='plus circle' />
        </Button>
      </div>
  
    )
  }
}


const GridFoot = (props) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <AddUser onAdd={(username) => props.onAdd(username)}/>
      </Grid.Column>
    </Grid.Row>
  );
}

const CoffeeData = (props) => {
  let coffeeIndex = -1;
  return props.consumptionData.map(c => {
    let cellKey = `${c.name}-${c.consumed}`
    coffeeIndex++;
    return (
      <RenderCoffeeData
        cellKey={cellKey}
        name={c.name}
        consumed={c.consumed}
        coffeeIndex={coffeeIndex}
        onIncrease={(indexOfUser, indexOfCoffee) => props.onIncrease(indexOfUser, indexOfCoffee)}
        userIndex={props.userIndex}
      />
    );
  })
}

const RenderCoffeeData = (props) =>{
  //Needed because of Lambda closure otherwise the index is always the maxvalue
  return (
    <Table.Cell key={props.cellKey}>
      <Button basic icon labelPosition='right' color='blue' onClick={() => props.onIncrease(props.userIndex, props.coffeeIndex)}>
        {props.name} : {props.consumed}
        <Icon name='plus circle' />
      </Button>
    </Table.Cell>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);
    //getAsyncUsers(this.setUserData)
    this.state = {
      users: this.sortUserData(getUserData())
    }
  }

  setUserData(users){
    
    this.setState({
      users: this.sortUserData(users)
    })
  }

  sortUserData(users) {
    let comparator = (userA, userB) => {
      let sum = individualCoffeeSum(userB) - individualCoffeeSum(userA);
      if(sum === 0){
        return ( ( userA.name === userB.name ) ? 0 : ( ( userA.name > userB.name ) ? 1 : -1 ) );
      }
      return sum;
    }

    return users.sort(comparator);

  }

  onDelete(index){
    let users = this.state.users.slice();
    users.splice(index, 1);

    this.setState({
      users: users
    });
  }

  onIncrease(indexOfUser, indexOfCoffee){
    let users = this.state.users.slice();
    let user = users[indexOfUser];
    user.consumptionData[indexOfCoffee].consumed++;

    this.setState({
      users: users
    });
  }

  onAdd(username){
    if(username.length < 2){
      alert("Username too short");
      return;
    }
    let startCharacter = username.charAt(0);
    if(startCharacter !== startCharacter.toUpperCase()){
      alert("Username must start with capital letter");
      return;
    }

    let users = this.state.users.slice();
    let newUser = createUser(username);
    users.push(newUser);
    let userResultSet = this.sortUserData(users);
    this.setState({
      users: userResultSet
    })
  }

  render() {
    return (
      <Container
        users={this.state.users}
        onDelete={(index) => this.onDelete(index)}
        onIncrease={(indexOfUser, indexOfCoffee) => this.onIncrease(indexOfUser, indexOfCoffee)}
        onAdd={(username) => this.onAdd(username)}
      />
    );
  }
}

export default App;
