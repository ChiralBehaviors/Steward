package com.chiralbehaviors.steward.graphql;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.Map;

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
        
        em.getTransaction().begin();
        GraphQlResource res = new GraphQlResource(mockedEmf());
        String workspace = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
        Map<String, Object> results = res.query(workspace, new QueryRequest(journeysQuery, Collections.emptyMap()));
        assertTrue(results.size() > 0);
        
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
