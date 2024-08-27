export const sceneExample = [
   {
     id: 'scene_1',
     title: 'Temple Entrance',
     description:
       'You stand before the majestic entrance of the ancient temple. The stone doors are covered in moss and look very heavy.',
     img: 'https://images.unsplash.com/photo-1723474549831-0d70d6c5f2b5?q=80&w=740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     type: 'default',
     answers: [
       {
         id: '1',
         text: 'Try to open the doors',
         nextSceneId: '2',
       },
       {
         id: '2',
         text: 'Look around',
         nextSceneId: '3',
       },
     ],
   },
 ]