import React from 'react';
import { Grid, Table, Button, Icon, Header, Input } from 'semantic-ui-react';
import {getUserData} from './converter';

const TableExampleCelledStriped = (props) => (
  <Grid celled='internally'>
    <GridHead/>
    <TotalCount users={props.users}/>
    <GridBody users={props.users}/>
    <GridFoot/>
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
    return (
      <Grid.Row>
        <Grid.Column>
          <Element username={u.name} consumptionData={u.consumptionData} coffeeCount={individualCoffeeSum(u)}/>
        </Grid.Column>
    </Grid.Row>
    )
  });
}

const Element = (props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='2'>
        {props.username}
        &nbsp;
        &nbsp;
        &nbsp;
        <Button icon>
          <Icon name='trash alternate' />
        </Button>
        </Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>{props.coffeeCount} Coffees</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <CoffeeData consumptionData={props.consumptionData}/>
      </Table.Row>
    </Table.Body>
  </Table>
)

const AddUser = () => (
  <Input
    icon='user'
    iconPosition='left'
    label={{ tag: true, content: 'Add User' }}
    labelPosition='right'
    placeholder='Enter Username'
  />
)

const GridFoot = () => {
  return (
    <Grid.Row>
      <Grid.Column>
        <AddUser/>
      </Grid.Column>
    </Grid.Row>
  );
}

const CoffeeData = (props) => {
  return props.consumptionData.map(c => {
    return (
      <Table.Cell>
        <Button basic icon labelPosition='right' color='blue'>
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
      users: getUserData()
    }
  }

  render() {
    return (
      <TableExampleCelledStriped
        users={this.state.users}
      />
    );
  }
}

export default App;
