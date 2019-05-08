import React from 'react';
import { Grid, Table, Header } from 'semantic-ui-react'
import { getUsers, getCoffees } from './api';

const TableExampleCelledStriped = (props) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell >The Coffee Counter (TCC)</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell >Total: 7 Coffees</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <TableBody users={props.users} coffees={props.coffees}/>
    </Table.Body>
  </Table>
)

function TableBody(props) {
  return props.users.map((u, c) => {
    const rowKey = `${u.name}`;
    return (
      <Table.Row key={rowKey}>
        <Table.Cell >
          <Header.Content>{u.name}</Header.Content>
          <Header.Subheader>Human Resources</Header.Subheader>
          <Header.Subheader>Human Resources</Header.Subheader>
        </Table.Cell>
      </Table.Row>
    )
  });
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
