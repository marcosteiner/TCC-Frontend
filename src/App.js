import React from 'react';
import { Grid, Table, Header } from 'semantic-ui-react'
import { getUsers, getCoffees } from './api';

const TableExampleCelledStriped = (props) => (
  <Grid celled='internally'>
    <GridBody users={props.users} coffees={props.coffees}/>
  </Grid>
)

const GridBody = (props) => {
  return props.users.map(u => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Element user={u.name} coffees={props.coffees}/>
        </Grid.Column>
    </Grid.Row>
    )
  });
}

const Element = (props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>{props.user}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <CoffeeData coffees={props.coffees}/>
      </Table.Row>
    </Table.Body>
  </Table>
)

const CoffeeData = (props) => {
  return props.coffees.map(c => {
    return (
      <Table.Cell>{c.name}</Table.Cell>
    );
  })
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: getUsers(),
      coffees: getCoffees(),
    }
  }

  render() {
    return (
      <TableExampleCelledStriped
        users={this.state.users}
        coffees={this.state.coffees}
      />
    );
  }
}

export default App;
