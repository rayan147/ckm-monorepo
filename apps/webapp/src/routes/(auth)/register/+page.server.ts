import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { api } from '@ckm/lib-api';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const registrationDataString = formData.get('registrationData') as string;

    if (!registrationDataString) {
      return fail(400, { message: 'Registration data is missing' });
    }

    try {
      const registrationData = JSON.parse(registrationDataString);

      // Here you would typically:
      // 1. Validate the data
      // 2. Create the user account in your database
      if (registrationData.isOrganization) {
        // **Step 1: Create the Organization**
        const organizationResponse = await api.orgs.createOrganization({
          body: {
            name: registrationData.organizationName,
            imageUrl: `https://images.unsplash.com/photo-1615915468538-0fbd857888ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3JnYW5pemF0aW9uJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D`
            // include other fields here
          }
        })

        const organizationId = organizationResponse.body.id

        //**Step 2: Create the Restaurants**
        const restaurantPromises = registrationData.restaurants.map((restaurant) => {
          api.restaurant.createRestaurant({
            body: {
              name: restaurant.name,
              imageUrl: 'https://images.unsplash.com/photo-1700530799809-bfe8221d0465?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
              address: restaurant.address,
              organization: { connect: { id: organizationId } },
              city: restaurant.city,
              state: restaurant.state,
              zipCode: restaurant.zipCode,
              owner: restaurant.owner
            }
          })
        });

        const restaurantResponses = await Promise.all(restaurantPromises);
        console.log({ restaurantResponses })
        // const restaurantIds = restaurantResponses.map((res) => res.body.id)

        // **Step 3: Create the User**
        const userResponse = await api.auth.register({
          body: {
            email: registrationData.email,
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            passwordHash: registrationData.password,
            role: 'ADMIN',
            organizationId
          }
        });

        console.log('User created:', userResponse);

        return { success: true };
      } else {
        console.log({ registrationData })
        const restaurant = await api.restaurant.createRestaurant({
          body: {
            name: registrationData.restaurants[0].name,
            imageUrl: registrationData.restaurants[0].imageUrl,
            address: registrationData.restaurants[0].address,
            city: registrationData.restaurants[0].city,
            state: registrationData.restaurants[0].state,
            zipCode: registrationData.restaurants[0].zipCode,
            owner: registrationData.restaurants[0].owner

          }
        })

        console.log(restaurant.body.bodyResult)
        if (restaurant.status === 201) {
          const user = await api.auth.register({
            body: {
              email: registrationData.email,
              firstName: registrationData.firstName,
              lastName: registrationData.lastName,
              passwordHash: registrationData.password,
              role: 'ADMIN',
              restaurantId: restaurant.body.id
            }
          })
        }
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return fail(500, { message: 'An error occurred during registration. Please try again.' });
    }
  }
};
