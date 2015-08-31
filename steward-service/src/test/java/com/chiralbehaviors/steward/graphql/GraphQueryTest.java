package com.chiralbehaviors.steward.graphql;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.junit.Test;

import com.chiralbehaviors.CoRE.phantasm.resources.GraphQlResource;
import com.chiralbehaviors.CoRE.phantasm.resources.GraphQlResource.QueryRequest;
import com.chiralbehaviors.CoRE.time.Interval;
import com.chiralbehaviors.steward.interval.Journey;
import com.chiralbehaviors.steward.workspace.AbstractStewardTest;

public class GraphQueryTest extends AbstractStewardTest {

    @Test
    public void testQueries() {
        String journeysQuery = "{ InstancesOfJourney { name id description } }";

        em.getTransaction()
          .begin();
        GraphQlResource res = new GraphQlResource(mockedEmf());
        String workspace = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
        Map<String, Object> results = res.query(null, workspace,
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
        Map<String, Object> results = res.query(null, workspace,
                                                new QueryRequest(journeysQuery,
                                                                 Collections.emptyMap()));
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        String createdId = (String) ((Map<String, Object>) results.get("CreateJourney")).get("id");
        String journeyInstancesQuery = "{ InstancesOfJourney { name id description steps{name}} }";

        results = res.query(null, workspace,
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

        String createStepQuery = "mutation m ($journey: String) { CreateStep (state: {setName: \"myFirstStep\", setDescription: \"baz\", addJourney: $journey}){ name id description } }";

        Map<String, Object> params = new HashMap<>();
        params.put("journey", createdId);
        results = res.query(null, workspace,
                            new QueryRequest(createStepQuery, params));

        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        String stepId = (String) ((Map<String, Object>) results.get("CreateStep")).get("id");
        assertEquals(stepId, model.getIntervalModel()
                                  .getChild(model.find(UUID.fromString(createdId),
                                                       Interval.class),
                                            model.getKernel()
                                                 .getHasMember())
                                  .getId()
                                  .toString());

        String returnJourneyQuery = "mutation m ($journey: String) { CreateStep (state: {setName: \"mySecondStep\", setDescription: \"baz\", addJourney: $journey}){ journeys {id name description steps {name}} }";

        params.put("journey", createdId);
        results = res.query(null, workspace,
                            new QueryRequest(returnJourneyQuery, params));

        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        assertEquals(createdId,
                     ((ArrayList<Map<String, Object>>) ((Map<String, Object>) results.get("CreateStep")).get("journeys")).get(0)
                                                                                                                         .get("id"));
        assertEquals(2, model.getIntervalModel()
                             .getChildren(model.find(UUID.fromString(createdId),
                                                     Interval.class),
                                          model.getKernel()
                                               .getHasMember())
                             .size());

        //        String addStepToJourney = "mutation m ($id: String, $journey: String) {UpdateStep (state: {id: $id, addJourney: $journey}) {name} }";
        //        params = new HashMap<>();
        //        params.put("id", stepId);
        //        params.put("journey", createdId);
        //        results = res.query(workspace,
        //                            new QueryRequest(addStepToJourney, params));
        //
        //        assertNull(results.get("errors"));
        //        assertTrue(results.size() > 0);

        String stepInstancesQuery = "{ InstancesOfStep { name id description } }";

        results = res.query(null, workspace,
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

    @Test
    public void testQuery2() throws InstantiationException {
        String journeysQuery = "mutation m ($name: String, $description: String, $journey: String) "
                               + "{ CreateStep (state: {setName: $name, setDescription: $description, addJourney: $journey}){ name }";

        em.getTransaction()
          .begin();

        Map<String, Object> params = new HashMap<>();
        UUID journeyId = model.construct(Journey.class, "my journey", "test")
                              .getRuleform()
                              .getId();
        params.put("journey", journeyId.toString());
        params.put("name", "steppy");
        params.put("description", "steppity step step step");
        GraphQlResource res = new GraphQlResource(mockedEmf());
        String workspace = "uri:http://ultrastructure.me/ontology/com.chiralbehaviors/demo/steward-workspace/v1";
        Map<String, Object> results = res.query(null, workspace,
                                                new QueryRequest(journeysQuery,
                                                                 params));
        assertNull(results.get("errors"));
        assertTrue(results.size() > 0);
        assertEquals(1, model.getIntervalModel()
                             .getChildren(model.find(journeyId,
                                                     Interval.class),
                                          model.getKernel()
                                               .getHasMember())
                             .size());
    }

}
