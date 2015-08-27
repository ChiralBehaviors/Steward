package com.chiralbehaviors.steward.graphql;

import java.util.Collections;
import java.util.Map;

import org.junit.Test;

import com.chiralbehaviors.CoRE.phantasm.resources.GraphQlResource;
import com.chiralbehaviors.CoRE.phantasm.resources.GraphQlResource.QueryRequest;
import com.chiralbehaviors.steward.workspace.AbstractStewardTest;

import static org.junit.Assert.*;

public class GraphQueryTest extends AbstractStewardTest {
    
    @Test
    public void testQueries() {
        String journeysQuery = "{ InstancesOfJourney { name id description } }";
        
        GraphQlResource res = new GraphQlResource(emf);
        String workspace = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
        Map<String, Object> results = res.query(workspace, new QueryRequest(journeysQuery, Collections.emptyMap()));
        assertTrue(results.size() > 0);
        
    }

}
