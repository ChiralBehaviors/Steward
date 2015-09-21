/**
 * Copyright (c) 2015 Chiral Behaviors, LLC, all rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.chiralbehaviors.steward.workspace;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.chiralbehaviors.steward.interval.Journey;
import com.chiralbehaviors.steward.interval.Step;

/**
 * @author hparry
 *
 */
public class StewardTest extends AbstractStewardTest {


    @Test
    public void testJourneys() throws InstantiationException {
        Journey journey = (Journey) model.construct(Journey.class,
                                                    "my journey", "test");

        journey.addStep((Step) model.construct(Step.class, "my first step",
                                               "my first step"));
        em.getTransaction().commit();

        assertEquals(1, journey.getSteps().size());
//        StewardResource resource = new StewardResource(emf);
//        assertEquals(1, resource.getJournies().size());
        //em.getTransaction().rollback();

    }

}
