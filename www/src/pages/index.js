import React from 'react';
import Layout from '../components/Layout';
import { Grid, Row, Column } from '../components/Grid';

export default function Home() {
  return (
    <Layout>
      <main id="main-content">
        <Grid>
          <Row>
            <Column>
              <h1>Hello, world!</h1>
            </Column>
          </Row>
        </Grid>
      </main>
    </Layout>
  );
}
