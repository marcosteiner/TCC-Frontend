import React from 'react';
import { Grid, Table, Button, Icon, Header, Input } from 'semantic-ui-react';
import {getUserData} from './converter';

const Container = (props) => (
  <Grid celled='internally'>
    <GridHead/>
    <TotalCount users={props.users}/>
    <GridBody 
      users={props.users} 
      onDelete={(name) => props.onDelete(name)}
      onIncrease={() => props.onIncrease()}
    />
    <GridFoot onAdd={() => props.onAdd()}/>
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
  return props.users.map(u => {
    let coffeeCount = individualCoffeeSum(u)
    let rowKey = `${u.name}-${coffeeCount}`
    return (
      <Grid.Row key={rowKey}>
        <Grid.Column>
          <Element 
            username={u.name} 
            consumptionData={u.consumptionData} 
            coffeeCount={coffeeCount} 
            onDelete={(name) => props.onDelete(name)}
            onIncrease={() => props.onIncrease()}
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
          <Button icon onClick={() => props.onDelete(props.username)}>
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
            onIncrease={() => props.onIncrease()}
          />
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

const AddUser = (props) => (
  <div>
      <Input
      icon='user'
      iconPosition='left'
      placeholder='Enter Username'
    />
    <Button basic icon labelPosition='right' color='red' onClick={props.onAdd}>
      Add User
      <Icon name='plus circle' />
    </Button>
  </div>
  
)

const GridFoot = (props) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <AddUser onAdd={() => props.onAdd()}/>
      </Grid.Column>
    </Grid.Row>
  );
}

const CoffeeData = (props) => {
  return props.consumptionData.map(c => {
    let cellKey = `${c.name}-${c.consumed}`
    return (
      <Table.Cell key={cellKey}>
        <Button basic icon labelPosition='right' color='blue' onClick={props.onIncrease}>
          {c.name} : {c.consumed}
          <Icon name='plus circle' />
        </Button>
      </Table.Cell>
    );
  })
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: this.sortUserData(getUserData())
    }
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

  removeUser(name){
    let comparator = (user) => {
      return user.name !== name;
    }

    let updatedUsers = this.state.users.filter(comparator);

    this.setState({
      users: updatedUsers
    });
  }

  onDelete(name){
    alert("deleted " + name);
  }

  onIncrease(){
    alert("incrased ");
  }

  onAdd(){
    alert("added ");
  }

  render() {
    return (
      <Container
        users={this.state.users}
        onDelete={(name) => this.onDelete(name)}
        onIncrease={() => this.onIncrease()}
        onAdd={() => this.onAdd()}
      />
    );
  }
}

export default App;
