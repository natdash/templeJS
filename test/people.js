function Person(name, age, bio)
{
	this.Name = name;
	this.Age = age;
	this.Bio = bio;
	this.Skills = [];
}

function Skill(title, description)
{
	this.Title = title;
	this.Description = description;
}

var testPeople =
[
	new Person('Nick Bedford', 27, 'Nick is a photographer.'),
    new Person('Nathaniel Dash', 27, '<p>Nathaniel is a JavaScript programmer.</p><p>He also has a dog named Cooper.</p>')
];

var otherTestPeople =
[
	new Person('John Carmack', 44, 'John D. Carmack is an American game programmer and the co-founder of Id Software. Carmack was the lead programmer of the Id video games Commander Keen, Wolfenstein 3D, Doom, Quake, Rage and their sequels.'),
    new Person('Steve Gibson', 59, 'Steven Gibson is an American software engineer, security researcher, and IT security gadfly. In the early 1980s, Gibson was best known for his work on light pen technology for use with Apple and Atari systems.')
];

testPeople[0].Skills = [ new Skill('C#', 'C# .NET programming'), new Skill('PHP', 'PHP MVC programming') ];
testPeople[1].Skills = [ new Skill('C++', 'C++ programming'), new Skill('JavaScript', 'JavaScript programming') ];
testPeople[1].Skills = [ ];

otherTestPeople[0].Skills = [ new Skill('Everything', 'Because he\'s John Carmack.') ];
otherTestPeople[1].Skills = [ new Skill('Security', 'Steve is nuts about security.') ];
