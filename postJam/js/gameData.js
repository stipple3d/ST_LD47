//TODO: make 'movePoints' 'relativeMovePoints' 
//(and have loopShoots handle figuring out what that means in setup)
const levels = [

{
title: 'LOOP LOOP TEST', 
ballSpeed: 200, //pixels per second
ballsToStart: 1,
levelWidth: 600,
levelHeight: 660,
topPadding: 0,
bottomPadding: 0,
loopshoots: [

	{cpX: 57, cpY: 176, cpRadius: 75, 
	movePoints: [
	{cX: 53, cY: 159},
	{cX: 53, cY: 134},
	{cX: 58, cY: 110},
	{cX: 65, cY: 86},
	{cX: 77, cY: 65},
	{cX: 90, cY: 45},
	{cX: 110, cY: 27},
	{cX: 136, cY: 16},
	{cX: 167, cY: 11},
	{cX: 196, cY: 12},
	{cX: 226, cY: 18},
	{cX: 247, cY: 34},
	{cX: 262, cY: 57},
	{cX: 270, cY: 81},
	{cX: 283, cY: 106},
	{cX: 303, cY: 129},
	{cX: 322, cY: 152},
	{cX: 344, cY: 172},
	{cX: 360, cY: 194},
	{cX: 365, cY: 219},
	{cX: 371, cY: 246},
	{cX: 384, cY: 273},
	{cX: 400, cY: 300},], releaseAngle: 80},

	/*{cpX: 45, cpY: 160, cpRadius: 75, 
	movePoints: [
		{cX: 50, cY: 145},
		{cX: 92, cY: 25},
		{cX: 134, cY: 10},
		{cX: 265, cY: 25},
		{cX: 285, cY: 110},
		{cX: 352, cY: 190},
		{cX: 367, cY: 245}
	],
	releaseAngle: 80},*/

	{cpX: 180, cpY: 90, cpRadius: 75, 
	movePoints: [
		{cX: 169, cY: 80},
		{cX: 105, cY: 48},
		{cX: 41, cY: 48},
		{cX: 11, cY: 100},
		{cX: 18, cY: 251},
		{cX: 31, cY: 295}
	],
	releaseAngle: 90},

	{cpX: 270, cpY: 210, cpRadius: 75, 
	movePoints: [
		{cX: 270, cY: 200},
		{cX: 274, cY: 156},
		{cX: 140, cY: 100},
		{cX: 294, cY: 35},
		{cX: 375, cY: 20},
		{cX: 450, cY: 35},
		{cX: 471, cY: 90},
		{cX: 450, cY: 142},
		{cX: 375, cY: 193},
		{cX: 331, cY: 290}
	],
	releaseAngle: 230},

	{cpX: 375, cpY: 100, cpRadius: 75, 
	movePoints: [
		{cX: 367, cY: 90},
		{cX: 339, cY: 67},
		{cX: 228, cY: 63},
		{cX: 169, cY: 124},
		{cX: 152, cY: 213}
	],
	releaseAngle: 230},

	{cpX: 460, cpY: 225, cpRadius: 75, 
	movePoints: [
		{cX: 450, cY: 218},
		{cX: 408, cY: 200},
		{cX: 375, cY: 136},
		{cX: 323, cY: 100},
		{cX: 209, cY: 110},
		{cX: 169, cY: 189},
		{cX: 180, cY: 300},
		{cX: 219, cY: 329}
	],
	releaseAngle: 230},

	{cpX: 550, cpY: 100, cpRadius: 75, 
	movePoints: [
		{cX: 556, cY: 110},
		{cX: 580, cY: 142},
		{cX: 580, cY: 214},
		{cX: 547, cY: 285},
		{cX: 484, cY: 335}
	],
	releaseAngle: 230}
]
},


{title: 'NEW LEVEL', ballSpeed: 200, ballsToStart: 1, levelWidth: 600, levelHeight: 660, topPadding: 0, bottomPadding: 0, loopshoots: [{cpX: 57, cpY: 176, cpRadius: 75, movePoints: [{cX: 53, cY: 159},{cX: 53, cY: 134},{cX: 58, cY: 110},{cX: 65, cY: 86},{cX: 77, cY: 65},{cX: 90, cY: 45},{cX: 110, cY: 27},{cX: 136, cY: 16},{cX: 167, cY: 11},{cX: 196, cY: 12},{cX: 226, cY: 18},{cX: 247, cY: 34},{cX: 262, cY: 57},{cX: 270, cY: 81},{cX: 283, cY: 106},{cX: 303, cY: 129},{cX: 322, cY: 152},{cX: 344, cY: 172},{cX: 360, cY: 194},{cX: 365, cY: 219},{cX: 371, cY: 246},{cX: 384, cY: 273},{cX: 400, cY: 300},], releaseAngle: 80},{cpX: 180, cpY: 90, cpRadius: 75, movePoints: [{cX: 169, cY: 80},{cX: 105, cY: 48},{cX: 41, cY: 48},{cX: 11, cY: 100},{cX: 18, cY: 251},{cX: 31, cY: 295},], releaseAngle: 80},{cpX: 270, cpY: 210, cpRadius: 75, movePoints: [{cX: 270, cY: 200},{cX: 274, cY: 156},{cX: 140, cY: 100},{cX: 294, cY: 35},{cX: 375, cY: 20},{cX: 450, cY: 35},{cX: 471, cY: 90},{cX: 450, cY: 142},{cX: 375, cY: 193},{cX: 331, cY: 290},], releaseAngle: 80},{cpX: 375, cpY: 100, cpRadius: 75, movePoints: [{cX: 367, cY: 90},{cX: 339, cY: 67},{cX: 228, cY: 63},{cX: 169, cY: 124},{cX: 152, cY: 213},], releaseAngle: 80},{cpX: 460, cpY: 225, cpRadius: 75, movePoints: [{cX: 450, cY: 218},{cX: 408, cY: 200},{cX: 375, cY: 136},{cX: 323, cY: 100},{cX: 209, cY: 110},{cX: 169, cY: 189},{cX: 180, cY: 300},{cX: 219, cY: 329},], releaseAngle: 80},{cpX: 550, cpY: 100, cpRadius: 75, movePoints: [{cX: 556, cY: 110},{cX: 580, cY: 142},{cX: 580, cY: 214},{cX: 547, cY: 285},{cX: 484, cY: 335},], releaseAngle: 80},]},
{title: 'NEW LEVEL', ballSpeed: 200, ballsToStart: 1, levelWidth: 600, levelHeight: 660, topPadding: 0, bottomPadding: 0, loopshoots: [{cpX: 57, cpY: 176, cpRadius: 75, movePoints: [{cX: 53, cY: 159},{cX: 53, cY: 134},{cX: 58, cY: 110},{cX: 65, cY: 86},{cX: 77, cY: 65},{cX: 90, cY: 45},{cX: 110, cY: 27},{cX: 136, cY: 16},{cX: 167, cY: 11},{cX: 196, cY: 12},{cX: 226, cY: 18},{cX: 247, cY: 34},{cX: 262, cY: 57},{cX: 270, cY: 81},{cX: 283, cY: 106},{cX: 303, cY: 129},{cX: 322, cY: 152},{cX: 344, cY: 172},{cX: 360, cY: 194},{cX: 365, cY: 219},{cX: 371, cY: 246},{cX: 384, cY: 273},{cX: 400, cY: 300},], releaseAngle: 80},{cpX: 180, cpY: 90, cpRadius: 75, movePoints: [{cX: 169, cY: 80},{cX: 105, cY: 48},{cX: 41, cY: 48},{cX: 11, cY: 100},{cX: 18, cY: 251},{cX: 31, cY: 295},], releaseAngle: 80},{cpX: 270, cpY: 210, cpRadius: 75, movePoints: [{cX: 270, cY: 200},{cX: 274, cY: 156},{cX: 140, cY: 100},{cX: 294, cY: 35},{cX: 375, cY: 20},{cX: 450, cY: 35},{cX: 471, cY: 90},{cX: 450, cY: 142},{cX: 375, cY: 193},{cX: 331, cY: 290},], releaseAngle: 80},{cpX: 375, cpY: 100, cpRadius: 75, movePoints: [{cX: 367, cY: 90},{cX: 339, cY: 67},{cX: 228, cY: 63},{cX: 169, cY: 124},{cX: 152, cY: 213},], releaseAngle: 80},{cpX: 460, cpY: 225, cpRadius: 75, movePoints: [{cX: 450, cY: 218},{cX: 408, cY: 200},{cX: 375, cY: 136},{cX: 323, cY: 100},{cX: 209, cY: 110},{cX: 169, cY: 189},{cX: 180, cY: 300},{cX: 219, cY: 329},], releaseAngle: 80},{cpX: 550, cpY: 100, cpRadius: 75, movePoints: [{cX: 556, cY: 110},{cX: 580, cY: 142},{cX: 580, cY: 214},{cX: 547, cY: 285},{cX: 484, cY: 335},], releaseAngle: 80},]},

];



