import React from 'react';
import { Grid, Table, Header } from 'semantic-ui-react';
import {getUserData} from './converter';

const TableExampleCelledStriped = (props) => (
  <Grid celled='internally'>
    <GridBody users={props.users}/>
  </Grid>
)

const GridBody = (props) => {
  return props.users.map(u => {
    return (
      <Grid.Row>
        <Grid.Column>
          <Element username={u.name} consumptionData={u.consumptionData}/>
        </Grid.Column>
    </Grid.Row>
    )
  });
}

const Element = (props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>{props.username}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <CoffeeData consumptionData={props.consumptionData}/>
      </Table.Row>
    </Table.Body>
  </Table>
)

const CoffeeData = (props) => {
  return props.consumptionData.map(c => {
    return (
      <Table.Cell>{c.name} : {c.consumed}</Table.Cell>
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
