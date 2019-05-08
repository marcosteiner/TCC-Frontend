import React from 'react';
import { Icon, Table } from 'semantic-ui-react'
import { getUsers } from './api';

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
      <TableBody users={props.users}/>
    </Table.Body>
  </Table>
)

function TableBody(props) {
  return props.users.map(u => {
    const rowKey = `${u.name}`;
    return (
      <Table.Row key={rowKey}>
        <Table.Cell >{u.name}</Table.Cell>
      </Table.Row>
    )
  });
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: getUsers(),
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
