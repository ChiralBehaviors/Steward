package com.chiralbehaviors.steward.graphql;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

import org.junit.Test;
import org.mockito.AdditionalAnswers;

import com.chiralbehaviors.CoRE.phantasm.resources.GraphQlResource;
import com.chiralbehaviors.CoRE.phantasm.resources.GraphQlResource.QueryRequest;
import com.chiralbehaviors.steward.workspace.AbstractStewardTest;

public class GraphQueryTest extends AbstractStewardTest {

    @Test
    public void testQueries() {
        String journeysQuery = "{ InstancesOfJourney { name id description } }";

        em.getTransaction()
          .begin();
        GraphQlResource res = new GraphQlResource(mockedEmf());
        String workspace = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
        Map<String, Object> results = res.query(workspace,
                                                new QueryRequest(journeysQuery,
                                                                 Collections.emptyMap()));
        assertTrue(results.size() > 0);

    }

    @SuppressWarnings("unchecked")
    @Test
    public void testCreate() {
        String journeysQuery = "mutation m { CreateJourney (state: {setName: \"foo\", setDescription: \"bar\"}){ name id description } }";

        em.getTransaction()
          .begin();
        GraphQlResource res = new GraphQlResource(mockedEmf());
        String workspace = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
        Map<String, Object> results = res.query(workspace,
                                                new QueryRequest(journeysQuery,
                                                                 Collections.emptyMap()));
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        String createdId = (String) ((Map<String, Object>) results.get("CreateJourney")).get("id");
        String journeyInstancesQuery = "{ InstancesOfJourney { name id description steps{name}} }";

        results = res.query(workspace,
                            new QueryRequest(journeyInstancesQuery,
                                             Collections.emptyMap()));
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        assertEquals(1,
                     ((List<Map<String, Object>>) results.get("InstancesOfJourney")).stream()
                                                                                    .filter(obj -> obj.get("id")
                                                                                                      .equals(createdId))
                                                                                    .collect(Collectors.toList())
                                                                                    .size());

        String createStepQuery = "mutation m { CreateStep (state: {setName: \"myFirstStep\", setDescription: \"bar\"}){ name id description } }";
        results = res.query(workspace,
                            new QueryRequest(String.format(createStepQuery, createdId),
                                             Collections.emptyMap()));
        
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        String stepId = (String) ((Map<String, Object>) results.get("CreateStep")).get("id");
        
        String addStepToJourney = "mutation m ($id: String, $journey: String) {UpdateStep (state: {id: $id, addJourney: $journey}) {name} }";
        Map<String, Object> params = new HashMap<>();
        params.put("id", stepId);
        params.put("journey", createdId);
        results = res.query(workspace,
                            new QueryRequest(addStepToJourney,
                                             params));
        
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);

        String stepInstancesQuery = "{ InstancesOfStep { name id description } }";

        results = res.query(workspace,
                            new QueryRequest(stepInstancesQuery,
                                             Collections.emptyMap()));
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        assertEquals(1,
                     ((List<Map<String, Object>>) results.get("InstancesOfStep")).stream()
                                                                                    .filter(obj -> obj.get("id")
                                                                                                      .equals(stepId))
                                                                                    .collect(Collectors.toList())
                                                                                    .size());
    }

    private EntityManagerFactory mockedEmf() {
        EntityManagerFactory mockedEmf = mock(EntityManagerFactory.class);
        EntityManager mockedEm = mock(EntityManager.class,
                                      AdditionalAnswers.delegatesTo(em));
        EntityTransaction mockedTxn = mock(EntityTransaction.class);
        doReturn(mockedTxn).when(mockedEm)
                           .getTransaction();
        doNothing().when(mockedEm)
                   .close();
        when(mockedEmf.createEntityManager()).thenReturn(mockedEm);
        return mockedEmf;
    }

}
