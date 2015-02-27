/* templeJS v0.1 - Straight forward HTML5 template engine */

Temple =
{
	generateItem: function(template, index, value)
	{
		// setup instance
		var instance = document.createElement('div');
		instance.setAttribute('data-temple', '');
		if (template.dataset.class)
			instance.className = template.dataset.class;
		instance.id = (template.id || 'value') + index;

		// clone template
		instance.appendChild(document.importNode(template.content, true));

		// evaluate data values
		var children = instance.querySelectorAll('[data-value], [data-htmlvalue]');
		for(var j = 0; j < children.length; j++)
		{
			var child = children[j];

			// evaluate text value
			if (child.dataset.value)
			{
				child.textContent = eval(child.dataset.value);
				child.removeAttribute('data-value');
			}

			// evaluate HTML value
			else if (child.dataset.htmlvalue)
			{
				child.innerHTML = eval(child.dataset.htmlvalue);
				child.removeAttribute('data-value');
			}
		}

		$.parentsOnly('[data-source]', instance).temple(value);
		this.appendChild(instance);
	},

	apply: function(value)
	{
		if (!this.dataset.source)
			return;

		// object array to iterate (convert if not array)
		var data = eval(this.dataset.source);
		if (!Array.prototype.isPrototypeOf(data))
			data = [ data ];

		// template to use
		var template =
			    this.dataset.template ?
				    document.getElementById(this.dataset.template) :
				    this.querySelector('template');

		if (template)
			for(var i in data)
				Temple.generateItem.call(this, template, i, data[i]);

		return $(this);
	},

	onload: function()
	{
		$('[data-onload]').temple();
	}
};

TempleExtensions =
{
	templeAll: function()
	{
		$.parentsOnly('[data-source]', this).temple();
	},

	temple: function(value)
	{
		return $(this).each(function() { Temple.apply.call(this, value); });
	},

	untemple: function()
	{
		$('[data-temple]', this).remove();
		return $(this);
	},

	retemple: function()
	{
		return $(this).untemple().temple();
	}
};

$.parentsOnly = function(selector, scope)
{
	return  $(selector, scope).filter(function() { return $(this).parent().closest(selector, scope).length == 0; });
};

$.fn.extend(TempleExtensions);
$(document).ready(Temple.onload);
